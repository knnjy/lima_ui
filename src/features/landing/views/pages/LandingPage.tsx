import { Box, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../../../../theme/tokens';
import farmPhoto from '../../../../assets/landing_hero_image.png';

/**
 * Landing page faithfully recreated from the provided HTML wireframe.
 * Uses MUI Box for layout while preserving exact visual design, colors,
 * spacing, and hierarchy from the wireframe.
 */
export default function LandingPage() {
  return (
    <Box
      sx={{
        backgroundColor: tokens.colors.background.default,
        fontFamily: tokens.fontFamily.body,
        color: tokens.colors.text.primary,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        minHeight: '100vh',
      }}
    >
      {/* NAV */}
      <Box
        component="nav"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          px: { xs: 2, md: '80px' },
          py: '23px',
          pl: { xs: 2, md: '132px' },
          backgroundColor: '#FFFFFF',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 2, md: 5 } }}>
          <MuiLink
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.15,
              mr: { xs: 0, md: 4.5 },
              color: tokens.colors.text.primary,
              textDecoration: 'none',
              '&:hover': { opacity: 0.8 },
            }}
          >
            LiMa
          </MuiLink>
          <MuiLink
            href="#features"
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: tokens.colors.text.primary,
              textDecoration: 'none',
              '&:hover': { opacity: 0.8 },
            }}
          >
            Features
          </MuiLink>
          <MuiLink
            href="#how"
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: tokens.colors.text.primary,
              textDecoration: 'none',
              '&:hover': { opacity: 0.8 },
            }}
          >
            How it works
          </MuiLink>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 2, md: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              sx={{
                minWidth: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: tokens.colors.accent.green,
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 12,
                '&:hover': { backgroundColor: '#3d5f3c' },
              }}
            >
              EN
            </Button>
            <Button
              sx={{
                minWidth: 44,
                height: 44,
                backgroundColor: 'transparent',
                color: tokens.colors.text.secondary,
                fontWeight: 500,
                fontSize: 12,
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
              }}
            >
              FR
            </Button>
          </Box>
          <MuiLink
            component={RouterLink}
            to="/login"
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: tokens.colors.text.primary,
              textDecoration: 'none',
              '&:hover': { opacity: 0.8 },
            }}
          >
            Sign in
          </MuiLink>
          <Button
            component={RouterLink}
            to="/register"
            sx={{
              width: 156,
              height: 46,
              backgroundColor: tokens.colors.primary.main,
              borderRadius: tokens.radius.sm,
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: 16,
              '&:hover': { backgroundColor: tokens.colors.primary.dark },
            }}
          >
            Create account
          </Button>
        </Box>
      </Box>

      {/* HERO */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          minHeight: 658,
          px: { xs: 3, md: '80px' },
          pt: '54px',
          pb: '80px',
          boxSizing: 'border-box',
          backgroundColor: tokens.colors.background.default,
        }}
      >
        {/* Hero image */}
        <Box
          component="img"
          src={farmPhoto}
          alt="Farm with a barn and crop fields"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: { xs: '100%', md: '70%' },
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        {/* Left fade overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #F7F8F2 0%, rgba(247,248,242,0.97) 42%, rgba(247,248,242,0.7) 62%, rgba(247,248,242,0.05) 80%, rgba(247,248,242,0) 100%)',
            display: { xs: 'none', md: 'block' },
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '45px',
            pt: 2,
            flex: '1 1 460px',
            maxWidth: 646,
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              m: 0,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.08em',
              color: tokens.colors.secondary.dark,
            }}
          >
            • BUILT FOR YOUR HARVEST
          </Typography>
          <Typography
            component="h1"
            sx={{
              m: 0,
              fontWeight: 700,
              fontSize: 'clamp(38px, 4.4vw, 54px)',
              lineHeight: 1.22,
              color: tokens.colors.text.primary,
              fontFamily: tokens.fontFamily.heading,
            }}
          >
            Manage your livestock
            <br />
            and believe in a better
            <br />
            <Box component="span" sx={{ color: tokens.colors.secondary.main }}>
              harvest.
            </Box>
          </Typography>
          <Typography
            sx={{
              m: 0,
              fontSize: 20,
              lineHeight: 1.15,
              color: tokens.colors.text.secondary,
            }}
          >
            Built for Filipino farm owners and workers.
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            sx={{
              width: 220,
              height: 68,
              backgroundColor: tokens.colors.primary.main,
              borderRadius: tokens.radius.sm,
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: 16,
              '&:hover': { backgroundColor: tokens.colors.primary.dark },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>

      {/* FEATURES */}
      <Box
        id="features"
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
          px: { xs: 3, md: '80px' },
          py: 7,
          backgroundColor: tokens.colors.background.features,
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            component="h2"
            sx={{
              m: 0,
              fontFamily: tokens.fontFamily.heading,
              fontWeight: 700,
              fontSize: 32,
              lineHeight: '42px',
              color: tokens.colors.text.primary,
            }}
          >
            What LiMa does
          </Typography>
          <Typography
            sx={{
              m: 0,
              fontSize: 18,
              lineHeight: '28px',
              color: tokens.colors.text.muted,
            }}
          >
            Everything you need to run your farm, in one simple place.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 2.5,
            
          }}
        >
          {[
            {
              title: 'Animal records',
              desc: 'Keep animal details, growth, and farm history in one place.',
            },
            {
              title: 'Feed tracking',
              desc: 'Record feed use and costs so you can plan supplies ahead.',
            },
            {
              title: 'Health reminders',
              desc: 'Keep track of vaccinations, treatments, and upcoming checkups.',
            },
            {
              title: 'Sales and expenses',
              desc: "Log what comes in and what goes out to understand your farm's profit.",
            },
            {
              title: 'Weather warnings',
              desc: 'Stay aware of weather changes so you can prepare your animals.',
            },
            {
              title: 'AI suggestions',
              desc: 'Get practical suggestions to help you make sense of your farm data.',
            },
          ].map((f) => (
            <Box
              key={f.title}
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 3,
                minHeight: 144,
                backgroundColor: '#FFFFFF',
                border: `1px solid ${tokens.colors.primary.main}`,
                borderRadius: tokens.radius.lg,
              }}
            >
              <Typography
                component="h3"
                sx={{
                  m: 0,
                  fontFamily: tokens.fontFamily.heading,
                  fontWeight: 700,
                  fontSize: 17,
                  lineHeight: 1.4,
                  color: '#1B241E',
                }}
              >
                {f.title}
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: tokens.colors.text.muted,
                }}
              >
                {f.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* HOW IT WORKS */}
      <Box
        id="how"
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3.5,
          px: { xs: 3, md: '85px' },
          pt: '70px',
          pb: 7,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          component="h2"
          sx={{
            m: 0,
            fontFamily: tokens.fontFamily.heading,
            fontWeight: 700,
            fontSize: 32,
            lineHeight: 1.25,
            color: '#1B241E',
          }}
        >
          How it works
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 2.5,
          }}
        >
          {[
            {
              n: 1,
              title: 'Create your farm',
              desc: 'Set up your farm profile and choose your preferred language.',
            },
            {
              n: 2,
              title: 'Add your animals',
              desc: 'Start with your livestock details, feed, and health records.',
            },
            {
              n: 3,
              title: 'Track your day',
              desc: 'Log farm activities and check reminders and summaries.',
            },
          ].map((s) => (
            <Box key={s.n} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '999px',
                  backgroundColor: tokens.colors.accent.orange,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {s.n}
              </Box>
              <Typography
                component="h3"
                sx={{
                  m: 0,
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: 1.4,
                  color: '#1B241E',
                }}
              >
                {s.title}
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: tokens.colors.text.muted,
                }}
              >
                {s.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          px: { xs: 2, md: '160px' },
          pb: 7,
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2.25,
            py: 7,
            px: 3,
            backgroundColor: tokens.colors.background.cta,
            borderRadius: tokens.radius.xl,
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <Typography
            component="h2"
            sx={{
              m: 0,
              fontFamily: tokens.fontFamily.heading,
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.25,
              color: '#FFFFFF',
            }}
          >
            Ready to organize your farm?
          </Typography>
          <Typography
            sx={{
              m: 0,
              fontSize: 15,
              lineHeight: 1.55,
              color: tokens.colors.text.light,
            }}
          >
            Start with simple records. Build better farm habits.
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            sx={{
              minHeight: 47,
              px: 3.5,
              backgroundColor: '#FFFFFF',
              borderRadius: tokens.radius.md,
              color: tokens.colors.background.cta,
              fontWeight: 700,
              fontSize: 15,
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
          px: { xs: 3, md: '160px' },
          py: 3.5,
          borderTop: `1px solid ${tokens.colors.border}`,
          boxSizing: 'border-box',
        }}
      >
        <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: tokens.colors.text.muted }}>
          LiMa
        </Typography>
        <Typography sx={{ fontSize: 13, lineHeight: 1.5, color: tokens.colors.text.muted }}>
          Privacy · Terms · Contact
        </Typography>
      </Box>
    </Box>
  );
}
