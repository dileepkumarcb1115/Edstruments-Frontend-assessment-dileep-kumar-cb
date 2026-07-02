export interface Reimbursement {
  id: number;
  employeeName: string;
  category: "Travel" | "Meals" | "Equipment" | "Other";
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  submittedOn: string;
  isUrgent: boolean;
  approver: { name: string; department: string };
  expenseTypes: string[];
}

export const reimbursements: Reimbursement[] = [
  { id: 1, employeeName: "John Smith", category: "Travel", amount: 450, status: "Approved", submittedOn: "2024-01-05", isUrgent: false, approver: { name: "Karen Young", department: "Finance" }, expenseTypes: ["flight", "hotel"] },
  { id: 2, employeeName: "Emily Johnson", category: "Meals", amount: 65, status: "Pending", submittedOn: "2024-02-10", isUrgent: false, approver: { name: "Karen Young", department: "Finance" }, expenseTypes: ["client-dinner"] },
  { id: 3, employeeName: "Michael Brown", category: "Equipment", amount: 1200, status: "Approved", submittedOn: "2024-02-14", isUrgent: true, approver: { name: "Arthur Rogers", department: "IT" }, expenseTypes: ["laptop-accessory"] },
  { id: 4, employeeName: "Sarah Davis", category: "Travel", amount: 890, status: "Rejected", submittedOn: "2024-03-01", isUrgent: false, approver: { name: "Karen Young", department: "Finance" }, expenseTypes: ["flight"] },
  { id: 5, employeeName: "James Wilson", category: "Other", amount: 150, status: "Pending", submittedOn: "2024-03-08", isUrgent: false, approver: { name: "Arthur Rogers", department: "IT" }, expenseTypes: ["training"] },
  { id: 6, employeeName: "Robert Taylor", category: "Meals", amount: 42, status: "Approved", submittedOn: "2024-03-15", isUrgent: false, approver: { name: "Karen Young", department: "Finance" }, expenseTypes: ["team-lunch"] },
  { id: 7, employeeName: "Thomas Hall", category: "Equipment", amount: 3200, status: "Pending", submittedOn: "2024-03-22", isUrgent: true, approver: { name: "Arthur Rogers", department: "IT" }, expenseTypes: ["monitor", "keyboard"] },
  { id: 8, employeeName: "Karen Young", category: "Travel", amount: 1120, status: "Approved", submittedOn: "2024-03-28", isUrgent: false, approver: { name: "Wayne Richardson", department: "Executive" }, expenseTypes: ["flight", "hotel", "cab"] },
  { id: 9, employeeName: "Donna Mitchell", category: "Other", amount: 300, status: "Rejected", submittedOn: "2024-04-02", isUrgent: false, approver: { name: "Karen Young", department: "Finance" }, expenseTypes: ["subscription"] },
  { id: 10, employeeName: "Anthony Campbell", category: "Meals", amount: 88, status: "Approved", submittedOn: "2024-04-09", isUrgent: false, approver: { name: "Karen Young", department: "Finance" }, expenseTypes: ["client-dinner"] },
  { id: 11, employeeName: "Arthur Rogers", category: "Equipment", amount: 540, status: "Pending", submittedOn: "2024-04-15", isUrgent: false, approver: { name: "Wayne Richardson", department: "Executive" }, expenseTypes: ["headset"] },
  { id: 12, employeeName: "Wayne Richardson", category: "Travel", amount: 2300, status: "Approved", submittedOn: "2024-04-21", isUrgent: true, approver: { name: "Wayne Richardson", department: "Executive" }, expenseTypes: ["flight", "hotel"] },
];
