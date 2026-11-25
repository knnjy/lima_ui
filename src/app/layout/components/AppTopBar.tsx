import { NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import type { AppLayoutViewModel } from "../useAppLayoutViewModel";

export function AppTopBar({ vm }: { vm: AppLayoutViewModel }) {
  return (
    <Box
      component="header"
      sx={{
        height: 76,
        minHeight: 76,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, fontSize: 12, color: "text.primary", flex: 1 }}
      >
        {vm.breadcrumb}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2.5 } }}>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
        >
          Example data
        </Typography>
        <IconButton
          size="small"
          onClick={vm.clearNotifications}
          aria-label="Notifications"
          sx={{ position: "relative" }}
        >
          <Badge
            variant="dot"
            invisible={!vm.hasNotifications}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#A5772D",
                width: 6,
                height: 6,
                minWidth: 6,
                top: 6,
                right: 6,
              },
            }}
          >
            <NotificationsOutlined sx={{ color: "primary.main", fontSize: 22 }} />
          </Badge>
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#D9E4C3",
              color: "primary.main",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {vm.currentUser.initials}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4, color: "text.primary" }}
            >
              {vm.currentUser.firstName} {vm.currentUser.lastName}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "text.secondary", lineHeight: 1.3 }}>
              {vm.currentUser.role}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
