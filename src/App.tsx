import { useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { SlidersHorizontal } from "lucide-react";
import { TableExplorer } from "./components/TableExplorer";
import { employeeFilterFields } from "./config/employeeFilterFields";
import { employeeColumns } from "./config/employeeColumns";
import { usersFilterFields } from "./config/usersFilterFields";
import { usersColumns } from "./config/usersColumns";
import { transactionsFilterFields } from "./config/transactionsFilterFields";
import { transactionsColumns } from "./config/transactionsColumns";
import { reimbursementsFilterFields } from "./config/reimbursementsFilterFields";
import { reimbursementsColumns } from "./config/reimbursementsColumns";
import { users } from "./data/users";
import { transactions } from "./data/transactions";
import { reimbursements } from "./data/reimbursements";
import { useEmployees } from "./hooks/useEmployees";

const TAB_LABELS = ["Employees", "Users", "Transactions", "Reimbursements"] as const;

function App() {
  const [tab, setTab] = useState(0);
  const { employees, isLoading, error } = useEmployees();

  return (
    <>
      <CssBaseline />

      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Toolbar sx={{ py: 1.5, gap: 1.5 }}>
          <SlidersHorizontal size={22} color="#4f46e5" style={{ flexShrink: 0 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              Dynamic Filter Component System
            </Typography>
            <Typography variant="caption" color="text.secondary">
              One FilterPanel, DataTable, and applyFilters — four different table schemas
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          <Paper
            variant="outlined"
            sx={{ borderRadius: 3, mb: 3, px: 1, maxWidth: "100%", overflow: "hidden" }}
          >
            <Tabs
              value={tab}
              onChange={(_, value: number) => setTab(value)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ minHeight: 44 }}
            >
              {TAB_LABELS.map((label) => (
                <Tab key={label} label={label} sx={{ minHeight: 44 }} />
              ))}
            </Tabs>
          </Paper>

          {tab === 0 &&
            (error ? (
              <Alert severity="error">{error}</Alert>
            ) : isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableExplorer
                data={employees}
                fields={employeeFilterFields}
                columns={employeeColumns}
                getRowId={(employee) => employee.id}
              />
            ))}

          {tab === 1 && (
            <TableExplorer
              data={users}
              fields={usersFilterFields}
              columns={usersColumns}
              getRowId={(user) => user.id}
            />
          )}

          {tab === 2 && (
            <TableExplorer
              data={transactions}
              fields={transactionsFilterFields}
              columns={transactionsColumns}
              getRowId={(transaction) => transaction.id}
            />
          )}

          {tab === 3 && (
            <TableExplorer
              data={reimbursements}
              fields={reimbursementsFilterFields}
              columns={reimbursementsColumns}
              getRowId={(reimbursement) => reimbursement.id}
            />
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;
