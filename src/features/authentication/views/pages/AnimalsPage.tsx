import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../../../../theme/tokens';
import headerImg from '../../../../assets/animals-header.jpg';
import cattleImg from '../../../../assets/cattle.jpg';
import pigsImg from '../../../../assets/pigs.jpg';
import chickensImg from '../../../../assets/chickens.jpg';

const ANIMAL_TYPES = [
  { key: 'cattle', title: 'Cattle', summary: '50 cattle · 4 pastures', image: cattleImg, to: '/animals/cattle', cta: 'View cattle' },
  { key: 'pigs', title: 'Pigs', summary: '20 pigs · 2 pens', image: pigsImg, to: '/animals/pigs', cta: 'View pigs' },
  { key: 'chickens', title: 'Chickens', summary: '80 chickens · 2 coops', image: chickensImg, to: '/animals/chickens', cta: 'View chickens' },
];

const primaryButtonSx = {
  height: 48,
  px: 2.5,
  backgroundColor: tokens.colors.primary.main,
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: 14,
  borderRadius: tokens.radius.sm,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: tokens.colors.primary.dark },
} as const;

const outlineButtonSx = {
  height: 48,
  color: tokens.colors.primary.main,
  borderColor: 'divider',
  fontWeight: 600,
  fontSize: 14,
  borderRadius: tokens.radius.sm,
  textTransform: 'none',
  '&:hover': { borderColor: tokens.colors.primary.main, backgroundColor: 'transparent' },
} as const;

export default function AnimalsPage() {
  return (
    <Box>
      <Box
        sx={{
          minHeight: 260,
          px: { xs: 2, md: 4 },
          py: 3.5,
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: `linear-gradient(90deg, rgba(14,41,26,0.91) 0%, rgba(14,41,26,0.66) 50%, rgba(14,41,26,0.13) 100%), url(${headerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography component="h1" sx={{ color: '#FFFFFF', fontSize: { xs: 26, md: 32 }, fontWeight: 700, lineHeight: 1.45 }}>
              Animals on your farm
            </Typography>
            <Typography sx={{ mt: 0.75, color: '#FFFFFF', fontSize: 14, lineHeight: 1.45 }}>
              Choose an animal type to explore its animals and records.
            </Typography>
          </Box>
          <Button component={RouterLink} to="/animals/new" sx={primaryButtonSx}>
            + Add animal
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ p: '16px 24px', borderRadius: 2, backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: tokens.colors.primary.main }}>
            Needs a closer look
          </Typography>
          <Typography sx={{ fontSize: 14, lineHeight: 1.45, color: tokens.colors.text.secondary }}>
            3 of 20 pigs have reduced-appetite reports today. Review the health records to see what changed.
          </Typography>
          <Button component={RouterLink} to="/health/rosie" variant="outlined" sx={outlineButtonSx}>
            Review Rosie’s health →
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' } }}>
          {ANIMAL_TYPES.map((a) => (
            <Box key={a.key} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', backgroundColor: 'background.paper' }}>
              <Box component="img" src={a.image} alt={a.title} sx={{ display: 'block', width: '100%', height: 160, objectFit: 'cover' }} />
              <Box sx={{ p: '20px 24px', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                <Typography sx={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, color: tokens.colors.primary.main }}>
                  {a.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: tokens.colors.text.secondary }}>{a.summary}</Typography>
                <Button component={RouterLink} to={a.to} fullWidth variant="outlined" sx={outlineButtonSx}>
                  {a.cta} →
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
