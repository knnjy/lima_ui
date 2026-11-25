// LAYOUT: the frame shared by account-level pages (header, content area, footer).
// Pages only pass their content as `children`, so they never repeat the header or footer.
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { AccountHeader } from "./AccountHeader";
import { AccountFooter } from "./AccountFooter";

interface Props {
  onLogout: () => void;
  helpHref?: string;
  footerNote?: ReactNode;
  children: ReactNode;
}

export function AccountLayout({ onLogout, helpHref = "/help", footerNote, children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <AccountHeader helpHref={helpHref} onLogout={onLogout} />

      <Box component="main" sx={{ flex: 1, pt: 5, px: { xs: 3, md: 12 } }}>
        {children}
      </Box>

      {footerNote && <AccountFooter>{footerNote}</AccountFooter>}
    </Box>
  );
}