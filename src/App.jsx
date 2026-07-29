import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { useMemo } from "react";
import { configureDashboardTheme } from "@/themes";
import Routes from "@/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { NotificationProvider } from "./contexts/notification";
import { BackToTopBtn } from "./components/ui";

function App() {
  const colors = useColor();
  const dashboardTheme = useMemo(
    () =>
      configureDashboardTheme({
        colors,
      }),
    [colors],
  );

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ThemeProvider theme={dashboardTheme}>
            <CssBaseline />
            <Routes />
            <BackToTopBtn />
          </ThemeProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
