import { useEffect, useState } from "react";
import type { Employee } from "../types";
import { fetchEmployees } from "../api/employeesApi";

interface UseEmployeesResult {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

export const useEmployees = (): UseEmployeesResult => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchEmployees()
      .then((data) => {
        if (!cancelled) setEmployees(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            "Could not load employee data from the mock API. Run `npm run mock-server` (or `npm run dev`, which starts it automatically) and retry.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { employees, isLoading, error };
};
