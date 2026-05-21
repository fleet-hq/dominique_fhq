// Site-specific content for the homepage and static pages.
// When white-labeling, duplicate this file per company or fetch from API.

export const siteContent = {
  company: {
    name: 'Faqtor',
    logo: '/logos/website-logo.png',
    monoLogo: '/logos/mono-logo.png',
    phone: '+1 907-617-3765',
    email: 'info@fleethqdemo.com',
    address: '123 Main St, Ketchikan, AK 99901',
    description:
      'Professional fleet management and car rental services for your business needs.',
  },

  navLinks: [
    { label: 'About', href: '/#about' },
    { label: 'Fleet', href: '/#fleet' },
    { label: 'FAQs', href: '/#faqs' },
  ],


  hero: {
    backgroundImage: '/images/home/hero/hero-bg.jpg',
  },

  features: [
    {
      title: 'Trusted by Our Community',
      description:
        'Family-owned and operated in Ketchikan for over 20 years. We know Alaska roads and treat you like neighbors, not numbers.',
    },
    {
      title: 'Budget-Friendly, Practical Fleet',
      description:
        "Reliable cars that won't break the bank. Perfect for work trips, extended stays, or exploring the Last Frontier on your terms.",
    },
    {
      title: 'Inter-Island Friendly Rentals',
      description:
        "Take our cars to neighboring islands via ferry. We're one of the few local rentals that support true Alaska exploration.",
    },
  ],

  about: {
    paragraphs: [
      'We have been married and lived in Ketchikan, Alaska for over 25 years. We loved raising our four children here, and as each one went on their way we found that our side hobby of renting cars, was something we wanted to get more involved in.',
      'We are a local business, supporting our community and those who are blessed to come visit here. Whether you are a local who temporarily needs a car, a traveler who is looking for a long term rental, or a tourist looking for the vacation of a lifetime we want to work with you.',
      'Please feel free to text with any concerns or questions you might have.',
    ],
    image: '/images/home/about/founders.jpg',
  },

  testimonials: [
    {
      rating: 5,
      quote: "Best rental experience I've had in Alaska!",
      content:
        'Dominique was so helpful and the car was perfect for our week-long adventure to Prince of Wales Island.',
      author: 'Sarah M.',
      location: 'Seattle, WA',
      date: 'August 2025',
    },
    {
      rating: 5,
      quote: 'Smooth pickup, no hassle at all',
      content:
        'Everything was ready when we arrived. Clean car, fair price, and friendly service. Will definitely rent again.',
      author: 'Michael T.',
      location: 'Anchorage, AK',
      date: 'July 2025',
    },
    {
      rating: 5,
      quote: 'Perfect for island hopping',
      content:
        'We took the ferry to Prince of Wales and explored for days. So glad we found a rental that allows inter-island travel.',
      author: 'Jessica L.',
      location: 'Portland, OR',
      date: 'September 2025',
    },
  ],

  faqs: [
    {
      question: 'What documents do I need to rent?',
      answer:
        "You will need a valid driver's license and a credit or debit card. International visitors may need an International Driving Permit.",
    },
    {
      question: 'Can I take the car on the ferry?',
      answer:
        'Yes! We are one of the few local rental companies that allow inter-island travel via the Alaska Marine Highway ferry system.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        'Free cancellation up to 24 hours before your pickup time. Late cancellations may be subject to a fee.',
    },
    {
      question: 'Do you offer insurance?',
      answer:
        'Yes, we offer optional Collision Damage Waiver (CDW) and Rental Car Liability Insurance (RCLI) through our insurance partner.',
    },
  ],

  cta: {
    backgroundImage: '/images/home/CTA/cta-bg.jpg',
  },
};
