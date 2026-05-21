'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import {
  getBookingBySession,
  BookingNotReadyYet,
} from '@/services/bookingServices';
import { setBookingToken } from '@/utils/booking-token';

// Stripe Checkout redirects here on payment success with `?session_id=cs_...`.
// We poll the by-session lookup endpoint, which itself calls
// fulfill_booking_checkout() inline — that either returns the freshly
// promoted Booking, or 202 if Stripe still says the payment is in flight.
// In normal operation the webhook arrives in under a second; we poll for
// up to ~20s as a defence against network blips or cold workers.

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 10; // 10 × 2s = 20s window

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  const [phase, setPhase] = useState<'loading' | 'processing' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // React 18 Strict Mode fires effects twice — guard against double polling.
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (!sessionId) {
      setPhase('error');
      setErrorMessage('Missing checkout session reference.');
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      while (!cancelled && attempts < MAX_ATTEMPTS) {
        attempts += 1;
        try {
          const booking = await getBookingBySession(sessionId);
          if (cancelled) return;
          if (booking.access_token) {
            setBookingToken(booking.access_token);
          }
          router.replace(
            `/booking/${booking.booking_id}?token=${encodeURIComponent(booking.access_token)}`,
          );
          return;
        } catch (err) {
          if (err instanceof BookingNotReadyYet) {
            if (attempts < MAX_ATTEMPTS) {
              setPhase('processing');
              await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
              continue;
            }
            setPhase('error');
            setErrorMessage(
              'Your payment is still processing. Refresh in a minute, or check your email for the booking confirmation.',
            );
            return;
          }
          setPhase('error');
          setErrorMessage(
            err instanceof Error
              ? err.message
              : 'We could not load your booking. Please contact support.',
          );
          return;
        }
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header showBorderBottom />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          {phase !== 'error' ? (
            <>
              <div className="mb-6 flex justify-center">
                <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                {phase === 'processing' ? 'Finalising your booking…' : 'Confirming payment…'}
              </h1>
              <p className="text-sm text-slate-600">
                {phase === 'processing'
                  ? 'Stripe is processing your payment. This usually takes just a moment.'
                  : 'One second while we set up your reservation.'}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-sm text-slate-600 mb-6">{errorMessage}</p>
              <button
                onClick={() => router.replace('/')}
                className="px-6 py-3 rounded-md bg-primary text-white text-sm font-medium"
              >
                Back to home
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SuccessPageContent />
    </Suspense>
  );
}
