import type { FilterFieldDefinition } from "../types";

export const reimbursementsFilterFields: FilterFieldDefinition[] = [
  { key: "employeeName", label: "Employee", type: "text" },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "Travel", value: "Travel" },
      { label: "Meals", value: "Meals" },
      { label: "Equipment", value: "Equipment" },
      { label: "Other", value: "Other" },
    ],
  },
  { key: "amount", label: "Amount", type: "amount" },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
    ],
  },
  { key: "submittedOn", label: "Submitted On", type: "date" },
  { key: "isUrgent", label: "Urgent", type: "boolean" },
  { key: "approver.department", label: "Approver Department", type: "text" },
  {
    key: "expenseTypes",
    label: "Expense Types",
    type: "multiselect",
    options: [
      { label: "Flight", value: "flight" },
      { label: "Hotel", value: "hotel" },
      { label: "Cab", value: "cab" },
      { label: "Client Dinner", value: "client-dinner" },
      { label: "Team Lunch", value: "team-lunch" },
      { label: "Laptop Accessory", value: "laptop-accessory" },
      { label: "Monitor", value: "monitor" },
      { label: "Keyboard", value: "keyboard" },
      { label: "Headset", value: "headset" },
      { label: "Training", value: "training" },
      { label: "Subscription", value: "subscription" },
    ],
  },
];
