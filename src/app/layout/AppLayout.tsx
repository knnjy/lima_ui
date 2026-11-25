import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBottomNav } from "./components/AppBottomNav";
import { AppSidebar } from "./components/AppSidebar";
import { AppTopBar } from "./components/AppTopBar";
import { useAppLayoutViewModel } from "./useAppLayoutViewModel";

export function AppLayout() {
  const vm = useAppLayoutViewModel();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <AppSidebar vm={vm} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100%",
        }}
      >
        <AppTopBar vm={vm} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, overflow: "auto" }}>
          <Outlet />
        </Box>
        <AppBottomNav vm={vm} />
      </Box>
    </Box>
  );
}