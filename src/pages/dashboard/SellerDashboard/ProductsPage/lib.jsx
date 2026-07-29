/**
 * @typedef {"active" | "draft" | "archived"} ProductStatus
 *
 * @typedef {{
 *   id:       string,
 *   name:     string,
 *   category: string,
 *   price:    number,
 *   stock:    number,
 *   status:   ProductStatus,
 *   image:    string,
 * }} Product
 */

/** @type {Product[]} */
export const products = [
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 120,
    stock: 45,
    status: "active",
    image: "https://placehold.co/40x40/6366f1/fff?text=WH",
  },
  {
    id: "P002",
    name: "Running Sneakers",
    category: "Footwear",
    price: 89,
    stock: 12,
    status: "active",
    image: "https://placehold.co/40x40/ec4899/fff?text=RS",
  },
  {
    id: "P003",
    name: "Leather Wallet",
    category: "Accessories",
    price: 45,
    stock: 0,
    status: "archived",
    image: "https://placehold.co/40x40/f59e0b/fff?text=LW",
  },
  {
    id: "P004",
    name: "Smart Watch",
    category: "Electronics",
    price: 299,
    stock: 8,
    status: "active",
    image: "https://placehold.co/40x40/14b8a6/fff?text=SW",
  },
  {
    id: "P005",
    name: "Yoga Mat",
    category: "Sports",
    price: 35,
    stock: 60,
    status: "draft",
    image: "https://placehold.co/40x40/8b5cf6/fff?text=YM",
  },
  {
    id: "P006",
    name: "Coffee Maker",
    category: "Kitchen",
    price: 199,
    stock: 22,
    status: "active",
    image: "https://placehold.co/40x40/10b981/fff?text=CM",
  },
];

/** .Column[]} */
export const columns = [
  { label: "" },
  { label: "Product" },
  { label: "Category" },
  { label: "Price" },
  { label: "Stock" },
  { label: "Status" },
  { label: "Actions" },
];
