import { AnnouncementBar, Header, Footer } from '@/components/layout';
import {
  HeroSection,
  FleetPreviewClient,
  FeaturesSection,
  AboutSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from '@/components/sections';
import { siteContent } from '@/constants/site-content';

export default function HomePage() {
  return (
    <div className="min-h-screen">
  
      <Header />
      <HeroSection backgroundImage={siteContent.hero.backgroundImage} />
      <FleetPreviewClient />
      <FeaturesSection features={siteContent.features} />
      <AboutSection
        paragraphs={siteContent.about.paragraphs}
        image={siteContent.about.image}
      />
      <TestimonialsSection testimonials={siteContent.testimonials} />
      <FAQSection faqs={siteContent.faqs} />
      <CTASection backgroundImage={siteContent.cta.backgroundImage} />
      <Footer hasCTAOverlap />
    </div>
  );
}
