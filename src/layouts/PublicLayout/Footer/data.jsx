// Footer/data.js

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Popular Categories",
    links: [
      { label: "Electronics", href: "/category/electronics" },
      { label: "Fashion", href: "/category/fashion" },
      { label: "Home & Living", href: "/category/home" },
      { label: "Services", href: "/category/services" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
      { label: "Become a Seller", href: "/seller/onboarding" },
      { label: "Buyer Protection", href: "/buyer-protection" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

// Bottom-bar quick links (kept separate from FOOTER_COLUMNS since these
// render inline, center-aligned, with a divider dot between each).
export const BOTTOM_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

// href placeholders — swap in real profiles when they exist.
export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", key: "facebook" },
  { label: "Twitter", href: "#", key: "x" },
  { label: "Instagram", href: "#", key: "instagram" },
  { label: "LinkedIn", href: "#", key: "whatsapp" },
  { label: "TikTok", href: "#", key: "tiktok" },
];
