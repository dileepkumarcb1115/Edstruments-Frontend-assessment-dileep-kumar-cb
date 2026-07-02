import type { FilterFieldDefinition } from "../types";

export const transactionsFilterFields: FilterFieldDefinition[] = [
  { key: "transactionId", label: "Transaction ID", type: "text" },
  { key: "amount", label: "Amount", type: "amount" },
  {
    key: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Card", value: "Card" },
      { label: "Bank", value: "Bank" },
      { label: "UPI", value: "UPI" },
    ],
  },
  { key: "isRefunded", label: "Refunded", type: "boolean" },
  { key: "processedAt", label: "Processed At", type: "date" },
  { key: "customer.region", label: "Region", type: "text" },
  {
    key: "tags",
    label: "Tags",
    type: "multiselect",
    options: [
      { label: "Online", value: "online" },
      { label: "Invoice", value: "invoice" },
      { label: "Recurring", value: "recurring" },
      { label: "Travel", value: "travel" },
      { label: "Refunded", value: "refunded" },
      { label: "High Value", value: "high-value" },
    ],
  },
];
