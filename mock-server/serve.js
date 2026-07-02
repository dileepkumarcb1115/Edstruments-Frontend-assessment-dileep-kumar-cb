import { createEmployeeMockApp } from "./app.js";

const PORT = process.env.MOCK_API_PORT || 3001;

createEmployeeMockApp().listen(PORT, () => {
  console.log(`[mock-json-api] Employee mock API running on http://localhost:${PORT}`);
});
