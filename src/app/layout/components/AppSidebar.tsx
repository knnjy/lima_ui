import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import type { AppLayoutViewModel } from "../useAppLayoutViewModel";
import { AppSidebarNavItem } from "./AppSidebarNavItem";

export function AppSidebar({ vm }: { vm: AppLayoutViewModel }) {
  const width = vm.sidebarCollapsed ? 72 : 280;

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: "none", md: "flex" },
        width,
        minWidth: width,
        height: "100%",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        flexDirection: "column",
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 2.5,
          pb: 1.5,
          minHeight: 56,
        }}
      >
        {!vm.sidebarCollapsed && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: 27,
              color: "primary.main",
              letterSpacing: -0.5,
            }}
          >
            LiMa
          </Typography>
        )}
        <IconButton
          size="small"
          onClick={vm.toggleSidebar}
          aria-label={vm.sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          sx={{
            bgcolor: "#EDF2E6",
            width: 36,
            height: 36,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#E2EAD9" },
          }}
        >
          <ChevronLeftIcon
            sx={{
              color: "primary.main",
              transform: vm.sidebarCollapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </IconButton>
      </Box>

      <Box sx={{ px: 2, mb: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={!vm.sidebarCollapsed ? <AddIcon /> : undefined}
          onClick={vm.onLogActivity}
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            py: 1.1,
            fontSize: 14,
            fontWeight: 600,
            justifyContent: vm.sidebarCollapsed ? "center" : "flex-start",
            minWidth: 0,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {vm.sidebarCollapsed ? <AddIcon /> : "Log Activity"}
        </Button>
      </Box>

      {!vm.sidebarCollapsed && (
        <Box sx={{ px: 2, mb: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search animal tag or name"
            value={vm.searchQuery}
            onChange={(event) => vm.onSearchChange(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "secondary.main" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                fontSize: 12,
                bgcolor: "background.default",
              },
            }}
          />
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5 }}>
        <List disablePadding>
          {vm.navItems.map((item) => (
            <AppSidebarNavItem
              key={item.id}
              item={item}
              active={vm.activeNavId === item.id}
              activeChildId={vm.activeNavChildId}
              expanded={vm.expandedNavId === item.id}
              collapsed={vm.sidebarCollapsed}
              onSelect={vm.selectNav}
              onSelectPath={vm.selectNavPath}
              onToggle={vm.toggleNavItem}
            />
          ))}
        </List>
      </Box>

      <Box sx={{ px: 2, pb: 2, pt: 1 }}>
        {!vm.sidebarCollapsed && (
          <>
            <Typography variant="caption" display="block" sx={{ pl: 1.5, mb: 0.25 }}>
              Farm Profile · My Account
            </Typography>
            <Typography variant="caption" display="block" sx={{ pl: 1.5, mb: 1.5 }}>
              Help
            </Typography>
          </>
        )}
        <Divider sx={{ mb: 1.5 }} />
        <Tooltip title={vm.sidebarCollapsed ? "Log out" : ""} placement="right">
          <Button
            fullWidth
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={vm.onLogout}
            sx={{
              justifyContent: vm.sidebarCollapsed ? "center" : "flex-start",
              color: "text.primary",
              fontSize: 13,
              fontWeight: 400,
              minWidth: 0,
              px: vm.sidebarCollapsed ? 0 : 1.25,
            }}
          >
            {!vm.sidebarCollapsed && "Log out"}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
