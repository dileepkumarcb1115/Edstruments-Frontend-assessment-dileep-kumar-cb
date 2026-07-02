import axios from "axios";
import type { Employee } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(`${API_BASE_URL}/api/employees`);
  return response.data;
};
