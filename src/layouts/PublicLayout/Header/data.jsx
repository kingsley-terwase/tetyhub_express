// data.js — CATEGORIES now carries an icon per entry so any component
// (mega-menu, CategoriesPage cards, etc.) can render a consistent sticker
// without redefining its own icon map.
import {
  StoreMicrosoft24Regular,
  Question24Regular,
  Headset24Regular,
  Laptop24Regular,
  Tag24Regular,
  Home24Regular,
  Sparkle24Regular,
  Wrench24Regular,
  Food24Regular,
  Games24Regular,
  Gift24Regular,
} from "@fluentui/react-icons";

export const NAV_LINKS = [
  { label: "Sell on TETYHUB", href: "/sell", icon: StoreMicrosoft24Regular },
  { label: "How it works", href: "/how-it-works", icon: Question24Regular },
  { label: "Support", href: "/contact", icon: Headset24Regular },
];

export const CATEGORIES = [
  {
    id: "electronics",
    label: "Electronics",
    icon: Laptop24Regular,
    subcategories: [
      "Phones & Tablets",
      "Laptops & Computers",
      "Audio",
      "Cameras",
      "Accessories",
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    icon: Tag24Regular,
    subcategories: [
      "Women's Clothing",
      "Men's Clothing",
      "Shoes",
      "Bags",
      "Jewelry & Watches",
    ],
  },
  {
    id: "home",
    label: "Home & Living",
    icon: Home24Regular,
    subcategories: [
      "Furniture",
      "Kitchen & Dining",
      "Decor",
      "Bedding",
      "Storage & Organization",
    ],
  },
  {
    id: "beauty",
    label: "Beauty & Personal Care",
    icon: Sparkle24Regular,
    subcategories: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Fragrances",
      "Grooming",
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: Wrench24Regular,
    subcategories: [
      "Photography",
      "Cleaning",
      "Design",
      "Repairs",
      "Consulting",
    ],
  },
  {
    id: "groceries",
    label: "Groceries",
    icon: Food24Regular,
    subcategories: [
      "Fresh Produce",
      "Pantry Staples",
      "Beverages",
      "Snacks",
      "Household Supplies",
    ],
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: Games24Regular,
    subcategories: [
      "Consoles",
      "Games",
      "Accessories",
      "PC Components",
      "Collectibles",
    ],
  },
  {
    id: "baby-kids",
    label: "Baby & Kids",
    icon: Gift24Regular,
    subcategories: ["Clothing", "Toys", "Feeding", "Nursery", "Safety"],
  },
];
