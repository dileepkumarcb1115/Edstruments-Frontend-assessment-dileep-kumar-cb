export interface Transaction {
  id: number;
  transactionId: string;
  amount: number;
  paymentMethod: "Card" | "Bank" | "UPI";
  isRefunded: boolean;
  processedAt: string;
  customer: { name: string; region: string };
  tags: string[];
}

export const transactions: Transaction[] = [
  { id: 1, transactionId: "TXN-1001", amount: 250, paymentMethod: "Card", isRefunded: false, processedAt: "2024-01-10", customer: { name: "Acme Retail", region: "West" }, tags: ["online"] },
  { id: 2, transactionId: "TXN-1002", amount: 4200, paymentMethod: "Bank", isRefunded: false, processedAt: "2024-02-15", customer: { name: "Globex Services", region: "East" }, tags: ["invoice", "recurring"] },
  { id: 3, transactionId: "TXN-1003", amount: 89, paymentMethod: "UPI", isRefunded: true, processedAt: "2024-02-20", customer: { name: "Initech Retail", region: "North" }, tags: ["online", "refunded"] },
  { id: 4, transactionId: "TXN-1004", amount: 1500, paymentMethod: "Card", isRefunded: false, processedAt: "2024-03-01", customer: { name: "Umbrella Travel", region: "South" }, tags: ["travel"] },
  { id: 5, transactionId: "TXN-1005", amount: 60, paymentMethod: "UPI", isRefunded: false, processedAt: "2024-03-05", customer: { name: "Acme Retail", region: "West" }, tags: ["online"] },
  { id: 6, transactionId: "TXN-1006", amount: 980, paymentMethod: "Bank", isRefunded: false, processedAt: "2024-03-12", customer: { name: "Soylent Foods", region: "East" }, tags: ["invoice"] },
  { id: 7, transactionId: "TXN-1007", amount: 320, paymentMethod: "Card", isRefunded: true, processedAt: "2024-03-18", customer: { name: "Stark Retail", region: "North" }, tags: ["online", "refunded"] },
  { id: 8, transactionId: "TXN-1008", amount: 15000, paymentMethod: "Bank", isRefunded: false, processedAt: "2024-03-25", customer: { name: "Wayne Enterprises", region: "West" }, tags: ["invoice", "high-value"] },
  { id: 9, transactionId: "TXN-1009", amount: 45, paymentMethod: "UPI", isRefunded: false, processedAt: "2024-04-02", customer: { name: "Initech Retail", region: "North" }, tags: ["online"] },
  { id: 10, transactionId: "TXN-1010", amount: 2100, paymentMethod: "Card", isRefunded: false, processedAt: "2024-04-08", customer: { name: "Umbrella Travel", region: "South" }, tags: ["travel", "recurring"] },
  { id: 11, transactionId: "TXN-1011", amount: 175, paymentMethod: "UPI", isRefunded: false, processedAt: "2024-04-14", customer: { name: "Acme Retail", region: "West" }, tags: ["online"] },
  { id: 12, transactionId: "TXN-1012", amount: 6300, paymentMethod: "Bank", isRefunded: false, processedAt: "2024-04-20", customer: { name: "Globex Services", region: "East" }, tags: ["invoice", "high-value"] },
  { id: 13, transactionId: "TXN-1013", amount: 99, paymentMethod: "Card", isRefunded: true, processedAt: "2024-04-27", customer: { name: "Stark Retail", region: "North" }, tags: ["online", "refunded"] },
  { id: 14, transactionId: "TXN-1014", amount: 730, paymentMethod: "UPI", isRefunded: false, processedAt: "2024-05-03", customer: { name: "Soylent Foods", region: "East" }, tags: ["online"] },
  { id: 15, transactionId: "TXN-1015", amount: 12500, paymentMethod: "Bank", isRefunded: false, processedAt: "2024-05-09", customer: { name: "Wayne Enterprises", region: "West" }, tags: ["invoice", "high-value", "recurring"] },
];
