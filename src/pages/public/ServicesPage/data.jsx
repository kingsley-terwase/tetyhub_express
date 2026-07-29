// ServicesPage/data.js
import {
  Camera24Regular,
  Home24Regular,
  PaintBrush24Regular,
  Wrench24Regular,
  Briefcase24Regular,
  Food24Regular,
  Book24Regular,
  Laptop24Regular,
  Sparkle24Regular,
} from "@fluentui/react-icons";

export const SERVICE_CATEGORIES = [
  { id: "photography", label: "Photography", icon: Camera24Regular },
  { id: "cleaning", label: "Home & Cleaning", icon: Home24Regular },
  { id: "design", label: "Design & Branding", icon: PaintBrush24Regular },
  { id: "repairs", label: "Repairs & Maintenance", icon: Wrench24Regular },
  { id: "consulting", label: "Business Consulting", icon: Briefcase24Regular },
  { id: "events", label: "Events & Catering", icon: Food24Regular },
  { id: "tutoring", label: "Tutoring & Lessons", icon: Book24Regular },
  { id: "tech", label: "Tech Support", icon: Laptop24Regular },
  { id: "beauty", label: "Beauty & Wellness", icon: Sparkle24Regular },
];

// Card-shaped fields only — ServiceDetailPage's buildServiceDetail() fills
// in everything a detail page additionally needs (packages, gallery, about
// sections, reviews), the same split ProductDetailPage uses.
export const SERVICES = [
  {
    id: "lens-and-light-photography",
    category: "photography",
    title: "Portrait & Event Photography",
    providerName: "Lens & Light Studio",
    location: "Lagos, Ikeja",
    rating: 5,
    ratingCount: 214,
    startingPrice: 35000,
    priceType: "per session",
    verified: true,
    responseTime: "Usually responds in 1 hour",
    completedJobs: 340,
    image:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "sparkleco-cleaning",
    category: "cleaning",
    title: "Deep Home & Office Cleaning",
    providerName: "SparkleCo",
    location: "Lagos, Lekki",
    rating: 4,
    ratingCount: 512,
    startingPrice: 12000,
    priceType: "per visit",
    verified: true,
    responseTime: "Usually responds in 30 minutes",
    completedJobs: 890,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "studio-nine-design",
    category: "design",
    title: "Logo & Brand Identity Design",
    providerName: "Studio Nine",
    location: "Abuja, Wuse",
    rating: 5,
    ratingCount: 178,
    startingPrice: 25000,
    priceType: "starting price",
    verified: true,
    responseTime: "Usually responds in 2 hours",
    completedJobs: 261,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "fixit-repairs",
    category: "repairs",
    title: "Home Appliance Repair",
    providerName: "FixIt Technicians",
    location: "Lagos, Surulere",
    rating: 4,
    ratingCount: 396,
    startingPrice: 8000,
    priceType: "call-out fee",
    verified: true,
    responseTime: "Usually responds in 20 minutes",
    completedJobs: 720,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "growthedge-consulting",
    category: "consulting",
    title: "Small Business Growth Strategy",
    providerName: "GrowthEdge Advisory",
    location: "Lagos, Victoria Island",
    rating: 5,
    ratingCount: 94,
    startingPrice: 50000,
    priceType: "per session",
    verified: true,
    responseTime: "Usually responds in 3 hours",
    completedJobs: 118,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "tastytray-catering",
    category: "events",
    title: "Event Catering & Small Chops",
    providerName: "TastyTray Events",
    location: "Abuja, Garki",
    rating: 5,
    ratingCount: 289,
    startingPrice: 3500,
    priceType: "per head",
    verified: true,
    responseTime: "Usually responds in 1 hour",
    completedJobs: 205,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "brightpath-tutoring",
    category: "tutoring",
    title: "WAEC/JAMB Home Tutoring",
    providerName: "BrightPath Tutors",
    location: "Lagos, Yaba",
    rating: 5,
    ratingCount: 167,
    startingPrice: 15000,
    priceType: "per month",
    verified: true,
    responseTime: "Usually responds in 1 hour",
    completedJobs: 302,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "quickfix-tech",
    category: "tech",
    title: "Laptop & Phone Repair, Same-Day",
    providerName: "QuickFix Tech Hub",
    location: "Lagos, Computer Village",
    rating: 4,
    ratingCount: 445,
    startingPrice: 5000,
    priceType: "diagnostic fee",
    verified: true,
    responseTime: "Usually responds in 15 minutes",
    completedJobs: 980,
    image:
      "https://images.unsplash.com/photo-1516131206008-dd041a9764fd?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "glow-beauty",
    category: "beauty",
    title: "Bridal Makeup & Hair Styling",
    providerName: "Glow Beauty Studio",
    location: "Lagos, Ikoyi",
    rating: 5,
    ratingCount: 231,
    startingPrice: 45000,
    priceType: "per appointment",
    verified: true,
    responseTime: "Usually responds in 2 hours",
    completedJobs: 189,
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=500&q=70",
  },
  {
    id: "urbanthread-design",
    category: "design",
    title: "Social Media Content & Graphics",
    providerName: "UrbanThread Creative",
    location: "Abuja, Maitama",
    rating: 4,
    ratingCount: 132,
    startingPrice: 18000,
    priceType: "per month",
    verified: false,
    responseTime: "Usually responds in 4 hours",
    completedJobs: 87,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&q=70",
  },
];

// ServiceDetailPage/data.js

// Fallback shown only on a direct URL visit/refresh, where route state
// (passed from ServiceCard's onClick) doesn't survive.
export const DEFAULT_SERVICE = {
  id: "lens-and-light-photography",
  category: "photography",
  title: "Portrait & Event Photography",
  providerName: "Lens & Light Studio",
  location: "Lagos, Ikeja",
  rating: 5,
  ratingCount: 214,
  startingPrice: 35000,
  priceType: "per session",
  verified: true,
  responseTime: "Usually responds in 1 hour",
  completedJobs: 340,
  image:
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=900&q=75",
};

const GENERIC_REVIEWERS = [
  { name: "Folake A.", verified: true },
  { name: "Michael E.", verified: true },
  { name: "Uche N.", verified: false },
  { name: "Zainab K.", verified: true },
];
const GENERIC_COMMENTS = [
  "Booked through TETYHUB and the whole process was smooth from first message to final delivery. Would book again without hesitation.",
  "Professional, punctual, and exactly what was promised in the listing. No surprises on the final invoice either.",
  "Good experience overall. Communication was a little slow at first but the actual work was excellent.",
  "Delivered ahead of schedule and went out of their way to accommodate a last-minute change I asked for.",
];

/**
 * @param {{ image: any; }} service
 */
function buildGallery(service) {
  // Real portfolio uploads would replace these — same image repeated as a
  // placeholder gallery, same honest limitation as ProductDetailPage's version.
  return [service.image, service.image, service.image, service.image];
}

/**
 * @param {{ startingPrice: any; }} service
 */
function buildPackages(service) {
  const base = service.startingPrice;
  return [
    {
      name: "Basic",
      price: base,
      turnaround: "Standard turnaround",
      features: [
        "Single session or visit",
        "Standard scheduling",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      price: Math.round(base * 1.8),
      turnaround: "Priority scheduling",
      features: [
        "Everything in Basic",
        "Priority scheduling",
        "1 round of revisions",
        "Phone support",
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: Math.round(base * 3),
      turnaround: "Fastest turnaround",
      features: [
        "Everything in Standard",
        "Fastest available turnaround",
        "Unlimited revisions",
        "Dedicated support line",
      ],
      highlighted: false,
    },
  ];
}

/**
 * @param {{ title: string; providerName: any; completedJobs: any; rating: any; ratingCount: any; verified: any; }} service
 */
function buildAboutSections(service) {
  return [
    {
      heading: `What's included with ${service.title.toLowerCase()}`,
      body: `${service.providerName} handles this from initial consultation through to final delivery — you're not left coordinating between multiple people. Every package below can be adjusted slightly to fit your specific brief once you're in touch.`,
    },
    {
      heading: "How booking works",
      body: "Choose a package, send a booking request with your preferred date, and the provider confirms availability directly with you through TETYHUB's messaging — no back-and-forth over external channels required before you're ready to commit.",
    },
    {
      heading: `Why book with ${service.providerName}`,
      body: `${service.completedJobs}+ completed jobs on TETYHUB and a ${service.rating}-star average across ${service.ratingCount} reviews. ${service.verified ? "Identity and business details have been verified by TETYHUB before this listing went live." : "This provider is newer to TETYHUB and has not yet completed identity verification — read reviews carefully before booking."}`,
    },
    {
      heading: "Cancellation & rescheduling",
      body: "Free cancellation up to 48 hours before your scheduled date. Cancellations inside that window may be subject to a partial fee, set by the provider and shown clearly before you confirm a booking.",
    },
  ];
}

/**
 * @param {{ rating: number; }} service
 */
function buildReviews(service) {
  return GENERIC_REVIEWERS.map((reviewer, i) => ({
    name: reviewer.name,
    verified: reviewer.verified,
    rating: Math.max(3, Math.min(5, service.rating - (i % 2))),
    date: new Date(Date.now() - (i + 1) * 9 * 86_400_000).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    ),
    comment: GENERIC_COMMENTS[i % GENERIC_COMMENTS.length],
  }));
}

/**
 * @param {any} service
 */
export function buildServiceDetail(service) {
  return {
    ...service,
    gallery: buildGallery(service),
    aboutSections: buildAboutSections(service),
    packages: buildPackages(service),
    reviews: buildReviews(service),
    ratingBreakdown: [
      { stars: 5, percent: 62 },
      { stars: 4, percent: 24 },
      { stars: 3, percent: 8 },
      { stars: 2, percent: 4 },
      { stars: 1, percent: 2 },
    ],
  };
}
