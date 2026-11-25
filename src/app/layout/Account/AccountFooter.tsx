import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AccountFooter({ children }: Props) {
  return (
    <Box
      component="footer"
      sx={{
        minHeight: 80,
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}
