import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../theme/tokens';

interface Props {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: tokens.colors.background.default,
        color: tokens.colors.text.primary,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: tokens.fontFamily.heading, fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography sx={{ color: tokens.colors.text.secondary, maxWidth: 480 }}>
        {description || 'This page is a placeholder. Full implementation will follow in a later phase.'}
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: tokens.colors.primary.main,
          '&:hover': { backgroundColor: tokens.colors.primary.dark },
        }}
      >
        Back to Landing
      </Button>
    </Box>
  );
}
