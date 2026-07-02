import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mock from "mock-json-api";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const employees = JSON.parse(
  readFileSync(path.join(dirname, "data/employees.json"), "utf-8"),
);

export function createEmployeeMockApp() {
  const mockApi = mock({
    cors: true,
    logging: true,
    mockRoutes: [
      {
        name: "getEmployees",
        mockRoute: "^/api/employees$",
        method: "GET",
        testScope: "success",
        jsonTemplate: () => JSON.stringify(employees),
      },
    ],
  });
  return mockApi.createServer();
}
