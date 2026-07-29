/**
 * @typedef {"active" | "paused" | "ended"} CampaignStatus
 *
 * @typedef {{
 *   id:        string,
 *   name:      string,
 *   type:      string,
 *   audience:  number,
 *   budget:    number,
 *   spent:     number,
 *   status:    CampaignStatus,
 *   startDate: string,
 * }} Campaign
 */

/** @type {Campaign[]} */
export const campaigns = [
  {
    id: "C001",
    name: "Summer Sale Blast",
    type: "Email",
    audience: 12400,
    budget: 500,
    spent: 320,
    status: "active",
    startDate: "Mar 1, 2026",
  },
  {
    id: "C002",
    name: "New Year Push",
    type: "SMS",
    audience: 8200,
    budget: 300,
    spent: 300,
    status: "ended",
    startDate: "Jan 1, 2026",
  },
  {
    id: "C003",
    name: "Product Launch",
    type: "Push",
    audience: 5000,
    budget: 800,
    spent: 210,
    status: "active",
    startDate: "Mar 10, 2026",
  },
  {
    id: "C004",
    name: "Re-engagement Drive",
    type: "Email",
    audience: 3100,
    budget: 200,
    spent: 0,
    status: "paused",
    startDate: "Feb 20, 2026",
  },
  {
    id: "C005",
    name: "Flash Weekend Offer",
    type: "SMS",
    audience: 9800,
    budget: 450,
    spent: 450,
    status: "ended",
    startDate: "Feb 14, 2026",
  },
  {
    id: "C006",
    name: "Loyalty Reward Push",
    type: "Push",
    audience: 2200,
    budget: 150,
    spent: 60,
    status: "active",
    startDate: "Mar 20, 2026",
  },
  {
    id: "C007",
    name: "Win-back Campaign",
    type: "Email",
    audience: 4400,
    budget: 350,
    spent: 120,
    status: "paused",
    startDate: "Mar 5, 2026",
  },
  {
    id: "C008",
    name: "Easter Special",
    type: "SMS",
    audience: 7600,
    budget: 600,
    spent: 600,
    status: "ended",
    startDate: "Mar 25, 2026",
  },
];

export const columns = [
  { label: "" },
  { label: "Campaign" },
  { label: "Type" },
  { label: "Audience" },
  { label: "Budget" },
  { label: "Spent" },
  { label: "Start Date" },
  { label: "Status" },
];
