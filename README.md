# Dynamic Filter Component System

A reusable, type-safe, config-driven filter system built with React 18, TypeScript, and Material UI. The running app has four tabs — **Employees**, **Users**, **Transactions**, **Reimbursements** — each a completely different data schema, all filtered and displayed by the exact same components. Only the configuration changes per tab; `FilterPanel`, `FilterRow`, `DataTable`, and `applyFilters` are never touched. Employees is the primary 50-record dataset served through `mock-json-api`; the other three ship as local sample data purely to demonstrate reusability across schemas.

## Setup

```bash
npm install
npm run dev
```

`npm run dev` starts two processes together (via `concurrently`):

- Vite dev server on `http://localhost:5173`
- The `mock-json-api` mock server on `http://localhost:3001`, serving `GET /api/employees`

Open `http://localhost:5173`. If you see a "Could not load employee data" banner, the mock server isn't running — start it on its own with `npm run mock-server`.

### Other scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Vite + mock API together (recommended for local development) |
| `npm run mock-server` | Mock API only, on port 3001 |
| `npm run build` | Type-check (`tsc -b`) and production build |
| `npm run lint` | ESLint |
| `npm run preview` | Preview the production build |

## How data is served

`mock-json-api` is an Express-based mock server. The route definitions and dataset live in [mock-server/app.js](mock-server/app.js) as `createEmployeeMockApp()`, which is reused by two entry points so the exact same mock API runs in both places:

- [mock-server/serve.js](mock-server/serve.js) — local dev, calls `.listen(3001)`.
- [api/employees.js](api/employees.js) — a Vercel serverless function that exports the same Express app, so the deployed build also serves `/api/employees` from a real (mocked) API call rather than a static import, without needing a second hosted service.

The frontend never imports the dataset directly — [src/api/employeesApi.ts](src/api/employeesApi.ts) fetches it with `axios`, and [src/hooks/useEmployees.ts](src/hooks/useEmployees.ts) exposes `{ employees, isLoading, error }` to the UI. `VITE_API_BASE_URL` (see `.env.development`) points the local dev build at `http://localhost:3001`; in production it's left empty so the request resolves to a same-origin relative path (`/api/employees`) on Vercel.

The source dataset is [mock-server/data/employees.json](mock-server/data/employees.json) — 50 synthetic employee records with text, number, date, boolean, array, and nested-object fields.

## Architecture

The system is split so the filter UI, the filtering logic, and the table are all driven by configuration rather than hardcoded per-field branches.

```
src/
  types/index.ts              # FieldType, FilterFieldDefinition, FilterCondition, ColumnDefinition<T>
  config/
    filterOperators.ts        # operator list per FieldType (shared by UI + validation)
    employeeFilterFields.ts / employeeColumns.tsx           # Employees table config
    usersFilterFields.ts / usersColumns.tsx                 # Users table config
    transactionsFilterFields.ts / transactionsColumns.tsx   # Transactions table config
    reimbursementsFilterFields.ts / reimbursementsColumns.tsx # Reimbursements table config
  components/
    TableExplorer.tsx         # composes FilterPanel + DataTable + applyFilters for one schema
    filters/
      FilterPanel.tsx         # add/remove/clear filter rows — generic
      FilterRow.tsx           # renders field/operator/value inputs from config — generic
    table/
      DataTable.tsx           # generic, sortable table driven by ColumnDefinition<T>[]
  utils/
    filterUtils.ts            # applyFilters<T>() — generic, field-type-aware filtering engine
    objectPath.ts             # dot-path lookup (e.g. "address.city") shared by filtering + table
    validation.ts             # range/number input validation
  data/users.ts, transactions.ts, reimbursements.ts   # local sample data for the 3 demo tables
  hooks/useEmployees.ts       # data fetching (loading/error) via axios
  api/employeesApi.ts         # axios client for the mock API
mock-server/                  # mock-json-api route + dataset, shared by local dev and Vercel
api/employees.js              # Vercel serverless entry point for the same mock API
```

`App.tsx` renders one `<Tabs>` bar and, per tab, a single `<TableExplorer data={...} fields={...} columns={...} getRowId={...} />`. That's the entire integration surface — `TableExplorer` itself is ~20 lines wiring `FilterPanel`, `DataTable`, and `applyFilters` together, with no knowledge of which table it's serving.

### Adding a new table

1. Define `FilterFieldDefinition[]` for the new schema (key, label, type, options) — see any `config/*FilterFields.ts`.
2. Define `ColumnDefinition<T>[]` for the new schema — see any `config/*Columns.tsx`.
3. Render `<TableExplorer data={yourData} fields={yourFields} columns={yourColumns} getRowId={...} />`.

That's genuinely the whole diff needed per table — it's how Users, Transactions, and Reimbursements were added: three new config/data files each, zero changes to `TableExplorer`, `FilterPanel`, `FilterRow`, `DataTable`, or `filterUtils.ts`.

Field keys support dot notation (`address.city`, `customer.region`, `approver.department`) for nested objects; `filterUtils.ts` and `DataTable.tsx` both resolve these through the same `getNestedValue` helper.

### Adding a new field type

1. Add the type to `FieldType` and its operator(s) to `FilterOperator` in `types/index.ts`.
2. Add its operator list to `operatorsByType` in `config/filterOperators.ts`.
3. Add a rendering case in `FilterRow.tsx`'s `renderValueInput()`.
4. Add an `evaluate*` function and a case in `evaluateCondition()` in `filterUtils.ts`.

### Filter semantics

- Filters on **different fields** are combined with **AND**.
- Multiple filter conditions on the **same field** are combined with **OR** (e.g. two `department` conditions match if either matches).
- Text matching is case-insensitive. Multi-select `in`/`notIn` check for any overlap between the record's array and the selected values.
- Range filters (`amount`, `date`) accept an open-ended bound — leaving Min or Max blank treats that side as unbounded. Date ranges are inclusive of the entire "To" day.
- An incomplete filter (no field selected, or no value entered yet) is ignored rather than excluding all records.

### Validation

- Amount and date ranges show an inline error and block on `min > max`.
- Number inputs show an inline error for non-numeric text.
- Network/loading failures from the mock API surface as a dismissable banner rather than a blank table.

## Known trade-offs

- Date range inputs use native `<input type="date">` pairs rather than a calendar-popup range picker, to avoid pulling in `@mui/x-date-pickers` for a single field type.
- `mock-json-api` ships an `AGENTS.md` aimed at AI coding assistants, suggesting an MCP server integration. That MCP server is not installed or configured here — only the core `mock()` / `createServer()` API is used, exactly as required by the assessment brief.
