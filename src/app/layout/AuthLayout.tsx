import type { ReactNode } from 'react';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../../theme/tokens';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

/**
 * Shared layout for authentication pages (login, register, forgot password).
 * Matches the LiMa design system from the landing wireframe.
 */
export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.colors.background.default,
        fontFamily: tokens.fontFamily.body,
        color: tokens.colors.text.primary,
      }}
    >
      {/* Simple top bar */}
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 10 },
          py: 2.5,
          backgroundColor: '#FFFFFF',
          borderBottom: `1px solid ${tokens.colors.border}`,
        }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 700,
            fontSize: 28,
            color: tokens.colors.text.primary,
            textDecoration: 'none',
            '&:hover': { opacity: 0.8 },
          }}
        >
          LiMa
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 500,
            fontSize: 14,
            color: tokens.colors.text.secondary,
            textDecoration: 'none',
            '&:hover': { opacity: 0.8 },
          }}
        >
          ← Back to home
        </MuiLink>
      </Box>

      {/* Centered content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 6,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 440,
            backgroundColor: '#FFFFFF',
            borderRadius: tokens.radius.xl,
            border: `1px solid ${tokens.colors.border}`,
            boxShadow: '0 4px 24px rgba(22, 61, 41, 0.06)',
            p: { xs: 3, sm: 4.5 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              m: 0,
              mb: 1,
              fontFamily: tokens.fontFamily.heading,
              fontWeight: 700,
              fontSize: { xs: 26, sm: 30 },
              lineHeight: 1.25,
              color: tokens.colors.text.primary,
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                m: 0,
                mb: 4,
                fontSize: 15,
                lineHeight: 1.5,
                color: tokens.colors.text.secondary,
                textAlign: 'center',
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
      </Box>

      {/* Footer strip */}
      <Box
        sx={{
          py: 2,
          textAlign: 'center',
          fontSize: 13,
          color: tokens.colors.text.muted,
        }}
      >
        LiMa · Built for Filipino farm owners
      </Box>
    </Box>
  );
}
