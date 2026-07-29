/**
 * @typedef {"available" | "unavailable" | "maintenance"} ServiceStatus
 *
 * @typedef {{
 *   id:       string,
 *   name:     string,
 *   category: string,
 *   price:    number,
 *   duration: string,
 *   provider: string,
 *   status:   ServiceStatus,
 * }} Service
 */

/** @type {Service[]} */
export const services = [
  {
    id: "S001",
    name: "Logo Design",
    category: "Design",
    price: 150,
    duration: "3 days",
    provider: "Peter Pan",
    status: "available",
  },
  {
    id: "S002",
    name: "SEO Audit",
    category: "Marketing",
    price: 200,
    duration: "5 days",
    provider: "Maria Garcia",
    status: "available",
  },
  {
    id: "S003",
    name: "App Development",
    category: "Tech",
    price: 2000,
    duration: "30 days",
    provider: "Ahmed Hassan",
    status: "maintenance",
  },
  {
    id: "S004",
    name: "Content Writing",
    category: "Content",
    price: 80,
    duration: "2 days",
    provider: "Juliet Romeo",
    status: "available",
  },
  {
    id: "S005",
    name: "Social Media Mgmt",
    category: "Marketing",
    price: 300,
    duration: "Monthly",
    provider: "Sarah J.",
    status: "unavailable",
  },
  {
    id: "S006",
    name: "UI/UX Design",
    category: "Design",
    price: 500,
    duration: "7 days",
    provider: "Viju Mike",
    status: "available",
  },
  {
    id: "S007",
    name: "Data Analytics",
    category: "Tech",
    price: 400,
    duration: "10 days",
    provider: "Peter Pan",
    status: "maintenance",
  },
  {
    id: "S008",
    name: "Brand Strategy",
    category: "Marketing",
    price: 700,
    duration: "14 days",
    provider: "Maria Garcia",
    status: "available",
  },
];

export const columns = [
  { label: "" },
  { label: "Service" },
  { label: "Category" },
  { label: "Price" },
  { label: "Duration" },
  { label: "Provider" },
  { label: "Status" },
  { label: "Actions" },
];
