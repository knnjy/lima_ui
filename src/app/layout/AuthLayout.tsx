
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
 * Shared layout for authentication pages:
 * Login, Register, and Forgot Password.
 */
export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
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
      {/* HEADER */}
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 10 },
          py: 2.5,
          backgroundColor: tokens.colors.background.paper,
          borderBottom: `1px solid ${tokens.colors.border}`,
        }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 700,
            fontSize: tokens.typography.logo,
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
            fontSize: tokens.typography.body,
            color: tokens.colors.text.secondary,
            textDecoration: 'none',
            '&:hover': { opacity: 0.8 },
          }}
        >
          ← Back to home
        </MuiLink>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: 1440,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 5, md: 8, lg: 12 },
          px: { xs: 3, sm: 5, md: 8, lg: 10 },
          py: { xs: 5, md: 7 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* LEFT SECTION - MARKETING CONTENT */}
        <Box
          sx={{
            flex: '1 1 400px',
            width: '100%',
            maxWidth: { xs: '100%', md: 504 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3.75,
          }}
        >
          {/* INTRODUCTION */}
          <Box>
            <Typography
              sx={{
                fontSize: tokens.typography.caption,
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: tokens.colors.secondary.dark,
                mb: 2,
              }}
            >
              GROW WITH LIMA
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: tokens.typography.heroSmall,
                  sm: tokens.typography.heroMedium,
                  md: tokens.typography.heroLarge,
                },
                fontWeight: 700,
                lineHeight: 1.2,
                color: tokens.colors.primary.main,
                letterSpacing: '-1.5px',
                mb: 2,
              }}
            >
              A better harvest
              <br />
              starts with you.
            </Typography>

            <Typography
              sx={{
                fontSize: tokens.typography.bodyLarge,
                lineHeight: 1.6,
                color: tokens.colors.text.secondary,
                maxWidth: 440,
              }}
            >
              Join LiMa and make your farm thrive through simple,
              everyday tools.
            </Typography>
          </Box>

          {/* FARM IMAGE PLACEHOLDER */}
          <Box
            sx={{
              width: '100%',
              height: { xs: 240, sm: 300, md: 372 },
              borderRadius: `${tokens.radius.image}px`,
              background:
                `linear-gradient(135deg, ${tokens.colors.secondary.light}, ${tokens.colors.accent.green})`,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              p: 2.5,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                backgroundColor: tokens.colors.background.paper,
                color: tokens.colors.primary.main,
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                fontSize: tokens.typography.small,
                fontWeight: 500,
              }}
            >
              FARM LANDSCAPE PHOTO
            </Typography>
          </Box>

          {/* TAGLINE */}
          <Box
            sx={{
              backgroundColor: tokens.colors.background.features,
              borderRadius: `${tokens.radius.panel}px`,
              px: 2.75,
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: tokens.typography.body,
                fontWeight: 600,
                color: tokens.colors.primary.main,
                mb: 0.5,
              }}
            >
              Built for your farm. Made for your future.
            </Typography>

            <Typography
              sx={{
                fontSize: tokens.typography.caption,
                color: tokens.colors.text.secondary,
              }}
            >
              For Filipino farm owners and workers.
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SECTION - AUTHENTICATION CARD */}
        <Box
          sx={{
            flex: '1 1 400px',
            width: '100%',
            maxWidth: { xs: '100%', md: 550 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              backgroundColor: tokens.colors.background.paper,
              borderRadius: tokens.radius.md,
              border: `1px solid ${tokens.colors.border}`,
              boxShadow: tokens.shadows.card,
              p: { xs: 3, sm: 4.5 },
            }}
          >
            {/* TITLE */}
            <Typography
              component="h2"
              sx={{
                m: 0,
                mb: 1,
                fontFamily: tokens.fontFamily.heading,
                fontWeight: 700,
                fontSize: {
                  xs: tokens.typography.cardTitleSmall,
                  sm: tokens.typography.cardTitleLarge,
                },
                lineHeight: 1.25,
                color: tokens.colors.text.primary,
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>

            {/* SUBTITLE */}
            {subtitle && (
              <Typography
                sx={{
                  m: 0,
                  mb: 4,
                  fontSize: tokens.typography.subtitle,
                  lineHeight: 1.5,
                  color: tokens.colors.text.secondary,
                  textAlign: 'center',
                }}
              >
                {subtitle}
              </Typography>
            )}

            {/* PAGE CONTENT */}
            {children}
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          textAlign: 'center',
          fontSize: tokens.typography.small,
          color: tokens.colors.text.muted,
          borderTop: `1px solid ${tokens.colors.border}`,
        }}
      >
        LiMa · Built for Filipino farm owners
      </Box>
    </Box>
  );
}
