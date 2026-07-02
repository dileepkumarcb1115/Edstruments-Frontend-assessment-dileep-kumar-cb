export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive";
  createdAt: string;
  isVerified: boolean;
  permissions: string[];
}

export const users: User[] = [
  { id: 1, name: "Ravi Kumar", email: "ravi.kumar@example.com", role: "Admin", status: "Active", createdAt: "2022-01-10", isVerified: true, permissions: ["read", "write", "delete"] },
  { id: 2, name: "Anita Rao", email: "anita.rao@example.com", role: "Editor", status: "Active", createdAt: "2022-03-22", isVerified: true, permissions: ["read", "write"] },
  { id: 3, name: "Ravi Shah", email: "ravi.shah@example.com", role: "Viewer", status: "Inactive", createdAt: "2023-01-15", isVerified: false, permissions: ["read"] },
  { id: 4, name: "Divya Menon", email: "divya.menon@example.com", role: "Editor", status: "Inactive", createdAt: "2023-02-01", isVerified: true, permissions: ["read", "write"] },
  { id: 5, name: "Karthik Iyer", email: "karthik.iyer@example.com", role: "Admin", status: "Active", createdAt: "2021-11-05", isVerified: true, permissions: ["read", "write", "delete", "manage-users"] },
  { id: 6, name: "Sneha Pillai", email: "sneha.pillai@example.com", role: "Viewer", status: "Active", createdAt: "2023-06-12", isVerified: false, permissions: ["read"] },
  { id: 7, name: "Arjun Nair", email: "arjun.nair@example.com", role: "Editor", status: "Active", createdAt: "2022-09-30", isVerified: true, permissions: ["read", "write"] },
  { id: 8, name: "Meera Krishnan", email: "meera.krishnan@example.com", role: "Viewer", status: "Inactive", createdAt: "2024-01-18", isVerified: false, permissions: ["read"] },
  { id: 9, name: "Vikram Reddy", email: "vikram.reddy@example.com", role: "Admin", status: "Active", createdAt: "2021-07-19", isVerified: true, permissions: ["read", "write", "delete"] },
  { id: 10, name: "Pooja Desai", email: "pooja.desai@example.com", role: "Editor", status: "Active", createdAt: "2023-10-02", isVerified: true, permissions: ["read", "write"] },
  { id: 11, name: "Rahul Verma", email: "rahul.verma@example.com", role: "Viewer", status: "Active", createdAt: "2024-02-25", isVerified: false, permissions: ["read"] },
  { id: 12, name: "Nisha Joshi", email: "nisha.joshi@example.com", role: "Editor", status: "Inactive", createdAt: "2022-05-08", isVerified: true, permissions: ["read", "write"] },
  { id: 13, name: "Suresh Babu", email: "suresh.babu@example.com", role: "Admin", status: "Active", createdAt: "2020-12-01", isVerified: true, permissions: ["read", "write", "delete", "manage-users"] },
  { id: 14, name: "Lakshmi Narayan", email: "lakshmi.n@example.com", role: "Viewer", status: "Active", createdAt: "2023-08-14", isVerified: false, permissions: ["read"] },
  { id: 15, name: "Ganesh Pillai", email: "ganesh.pillai@example.com", role: "Editor", status: "Active", createdAt: "2024-03-03", isVerified: true, permissions: ["read", "write"] },
];
