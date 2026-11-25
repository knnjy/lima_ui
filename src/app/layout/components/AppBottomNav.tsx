import { Box, ButtonBase, Typography } from "@mui/material";
import type { AppLayoutViewModel } from "../useAppLayoutViewModel";
import { NavItemIcon } from "./NavItemIcon";

export function AppBottomNav({ vm }: { vm: AppLayoutViewModel }) {
  return (
    <Box
      component="nav"
      aria-label="Farm navigation"
      sx={{
        display: { xs: "flex", md: "none" },
        height: 64,
        minHeight: 64,
        overflowX: "auto",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {vm.navItems.map((item) => {
        const active = vm.activeNavId === item.id;
        return (
          <ButtonBase
            key={item.id}
            onClick={() => vm.selectNav(item.id)}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            sx={{
              flex: "0 0 76px",
              flexDirection: "column",
              gap: 0.25,
              color: active ? "primary.main" : "text.secondary",
            }}
          >
            <NavItemIcon icon={item.icon} />
            <Typography
              variant="caption"
              noWrap
              sx={{ maxWidth: 72, fontSize: 10, fontWeight: active ? 600 : 400 }}
            >
              {item.label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
