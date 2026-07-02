import { Box, Chip } from "@mui/material";
import type { ColumnDefinition } from "../types";
import type { Transaction } from "../data/transactions";

export const transactionsColumns: ColumnDefinition<Transaction>[] = [
  { key: "transactionId", label: "Transaction ID" },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    render: (transaction) => `$${transaction.amount.toLocaleString()}`,
  },
  { key: "paymentMethod", label: "Method" },
  {
    key: "isRefunded",
    label: "Refunded",
    render: (transaction) => (
      <Chip
        label={transaction.isRefunded ? "Refunded" : "Settled"}
        color={transaction.isRefunded ? "warning" : "success"}
        size="small"
      />
    ),
  },
  { key: "processedAt", label: "Processed At" },
  { key: "customer.name", label: "Customer" },
  { key: "customer.region", label: "Region" },
  {
    key: "tags",
    label: "Tags",
    sortAccessor: (transaction) => transaction.tags.length,
    render: (transaction) => (
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
        {transaction.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Box>
    ),
  },
];
