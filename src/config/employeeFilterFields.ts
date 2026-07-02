import type { FilterFieldDefinition } from "../types";

export const employeeFilterFields: FilterFieldDefinition[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "text" },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { label: "Engineering", value: "Engineering" },
      { label: "Design", value: "Design" },
      { label: "Marketing", value: "Marketing" },
      { label: "Finance", value: "Finance" },
      { label: "HR", value: "HR" },
      { label: "Sales", value: "Sales" },
    ],
  },
  { key: "role", label: "Role", type: "text" },
  { key: "salary", label: "Salary", type: "amount" },
  { key: "joinDate", label: "Join Date", type: "date" },
  {
    key: "isActive",
    label: "Status",
    type: "boolean",
  },
  {
    key: "skills",
    label: "Skills",
    type: "multiselect",
    options: [
      { label: "React", value: "React" },
      { label: "TypeScript", value: "TypeScript" },
      { label: "Python", value: "Python" },
      { label: "Node.js", value: "Node.js" },
      { label: "AWS", value: "AWS" },
      { label: "Docker", value: "Docker" },
      { label: "Figma", value: "Figma" },
      { label: "SQL", value: "SQL" },
    ],
  },
  { key: "address.city", label: "City", type: "text" },
  { key: "projects", label: "Projects", type: "number" },
  { key: "performanceRating", label: "Performance Rating", type: "number" },
  { key: "lastReview", label: "Last Review", type: "date" },
];
