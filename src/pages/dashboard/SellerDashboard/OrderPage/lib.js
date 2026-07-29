/**
 * @typedef {"pending" | "processing" | "shipped" | "completed" | "cancelled" | "refunded"} OrderStatus
 *
 * @typedef {{
 *   id:          string,
 *   customer:    string,
 *   avatar:      string,
 *   email:       string,
 *   items:       number,
 *   total:       number,
 *   status:      OrderStatus,
 *   channel:     string,
 *   date:        string,
 *   risk:        "low" | "medium" | "high",
 * }} Order
 */

/** @type {Order[]} */
export const orders = [
  {
    id: "ORD-7841",
    customer: "Sarah Johnson",
    avatar: "SJ",
    email: "sarah@email.com",
    items: 3,
    total: 284.99,
    status: "completed",
    channel: "Web",
    date: "Mar 30, 2026",
    risk: "low",
  },
  {
    id: "ORD-7842",
    customer: "Ahmed Hassan",
    avatar: "AH",
    email: "ahmed@email.com",
    items: 1,
    total: 59.0,
    status: "pending",
    channel: "Mobile",
    date: "Mar 30, 2026",
    risk: "medium",
  },
  {
    id: "ORD-7843",
    customer: "Juliet Romeo",
    avatar: "JR",
    email: "juliet@email.com",
    items: 5,
    total: 820.5,
    status: "shipped",
    channel: "Web",
    date: "Mar 29, 2026",
    risk: "low",
  },
  {
    id: "ORD-7844",
    customer: "Peter Pan",
    avatar: "PP",
    email: "peter@email.com",
    items: 2,
    total: 142.0,
    status: "processing",
    channel: "POS",
    date: "Mar 29, 2026",
    risk: "low",
  },
  {
    id: "ORD-7845",
    customer: "Maria Garcia",
    avatar: "MG",
    email: "maria@email.com",
    items: 4,
    total: 399.99,
    status: "cancelled",
    channel: "Web",
    date: "Mar 28, 2026",
    risk: "high",
  },
  {
    id: "ORD-7846",
    customer: "Viju Mike",
    avatar: "VM",
    email: "viju@email.com",
    items: 2,
    total: 175.0,
    status: "refunded",
    channel: "Mobile",
    date: "Mar 28, 2026",
    risk: "low",
  },
  {
    id: "ORD-7847",
    customer: "Linda Osei",
    avatar: "LO",
    email: "linda@email.com",
    items: 6,
    total: 655.4,
    status: "completed",
    channel: "Web",
    date: "Mar 27, 2026",
    risk: "low",
  },
  {
    id: "ORD-7848",
    customer: "Kwame Asante",
    avatar: "KA",
    email: "kwame@email.com",
    items: 1,
    total: 45.0,
    status: "pending",
    channel: "Web",
    date: "Mar 27, 2026",
    risk: "medium",
  },
  {
    id: "ORD-7849",
    customer: "Chloe Laurent",
    avatar: "CL",
    email: "chloe@email.com",
    items: 3,
    total: 312.75,
    status: "shipped",
    channel: "Mobile",
    date: "Mar 26, 2026",
    risk: "low",
  },
  {
    id: "ORD-7850",
    customer: "James Okafor",
    avatar: "JO",
    email: "james@email.com",
    items: 7,
    total: 940.0,
    status: "processing",
    channel: "Web",
    date: "Mar 26, 2026",
    risk: "high",
  },
];

export const columns = [
  { label: "" },
  { label: "Order" },
  { label: "Customer" },
  { label: "Date" },
  { label: "Items" },
  { label: "Total" },
  { label: "Channel" },
  { label: "Risk" },
  { label: "Status" },
  { label: "Actions" },
];

/** @type {string[]} */
export const avatarColors = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#f97316",
  "#06b6d4",
  "#84cc16",
  "#ef4444",
];

/** @type {Record<string, any>} */
export const orderDetails = {
  "ORD-7841": {
    items: [
      {
        name: "Wireless Mouse",
        variant: "Black",
        sku: "WM-22",
        qty: 1,
        price: 45,
      },
      {
        name: "Mechanical Keyboard",
        variant: "RGB",
        sku: "MK-11",
        qty: 1,
        price: 120,
      },
      { name: "USB-C Hub", variant: "6-in-1", sku: "UH-88", qty: 1, price: 60 },
    ],

    payment: {
      discount: -10,
      shipping: 15,
      tax: 8.5,
    },

    billing: {
      method: "Visa •••• 4242",
    },

    shipping: {
      method: "Express",
      carrier: "DHL",
      tracking: "DHL-8839201",
      eta: "Apr 04, 2026",
      address: "22 Broad Street, New York, NY, USA",
    },

    customer: {
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1 202 555 0148",
      orders: 12,
      tier: "Gold",
      avatar: "SJ",
      avatarColor: "#6366f1",
    },

    notes: "Customer requested contactless delivery.",

    timeline: [
      { event: "Order Placed", time: "Mar 30, 09:10", actor: "Customer" },
      { event: "Payment Confirmed", time: "Mar 30, 09:12", actor: "System" },
      { event: "Packed", time: "Mar 30, 14:20", actor: "Warehouse" },
      { event: "Shipped", time: "Mar 31, 08:05", actor: "DHL" },
    ],
  },
};
