import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../../app/layout/AuthLayout';
import { tokens } from '../../../../theme/tokens';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    // Placeholder: simulate auth call. Real implementation will use Supabase.
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    // For now just navigate to home (mock success)
    // In real flow: check onboarding status → /onboarding or /home
    navigate('/home');
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back. Manage your farm with LiMa."
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: tokens.radius.sm }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2.5 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 1 }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <MuiLink
            component={RouterLink}
            to="/forgot-password"
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: tokens.colors.secondary.dark,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Forgot password?
          </MuiLink>
        </Box>

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          sx={{
            height: 52,
            backgroundColor: tokens.colors.primary.main,
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: 16,
            borderRadius: tokens.radius.sm,
            textTransform: 'none',
            '&:hover': { backgroundColor: tokens.colors.primary.dark },
            '&.Mui-disabled': { backgroundColor: tokens.colors.primary.main, opacity: 0.7 },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
        </Button>

        <Typography
          sx={{
            mt: 3,
            textAlign: 'center',
            fontSize: 14,
            color: tokens.colors.text.secondary,
          }}
        >
          Don&apos;t have an account?{' '}
          <MuiLink
            component={RouterLink}
            to="/register"
            sx={{
              fontWeight: 600,
              color: tokens.colors.primary.main,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Create account
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
