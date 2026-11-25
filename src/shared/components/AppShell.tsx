import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { tokens } from '../theme/tokens';

interface AppShellProps {
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Layout shell that mirrors the original page structure:
 * fixed-height nav → flex main → footer.
 */
export function AppShell({ header, children, footer }: AppShellProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {header}

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          px: { xs: 2, md: `${tokens.spacing.xl}px` },
          pt: 5,
          pb: 4,
        }}
      >
        <Container maxWidth={false} disableGutters sx={{ maxWidth: 1248 }}>
          {children}
        </Container>
      </Box>

      {footer && (
        <Box
          component="footer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 80,
            px: 3,
            textAlign: 'center',
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
}
