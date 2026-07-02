import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4f46e5" },
    background: { default: "#f4f5f9", paper: "#ffffff" },
    text: { primary: "#1a1a2e", secondary: "#64687a" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, letterSpacing: -0.5 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: { whiteSpace: "nowrap" },
        head: {
          fontWeight: 600,
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: 0.4,
          color: "#4b4f63",
          backgroundColor: "#f7f8fb",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, fontSize: "0.95rem" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
});
