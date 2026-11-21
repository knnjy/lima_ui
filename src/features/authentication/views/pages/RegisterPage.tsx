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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../../app/layout/AuthLayout';
import { tokens } from '../../../../theme/tokens';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('You must agree to the terms to continue.');
      return;
    }

    setLoading(true);
    // Placeholder: simulate registration. Real implementation will use Supabase Auth.
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);

    // After successful registration → onboarding
    navigate('/onboarding');
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start organizing your farm with LiMa."
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: tokens.radius.sm }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full name"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          sx={{ mb: 2.5 }}
          InputLabelProps={{ shrink: true }}
        />

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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2.5 }}
          InputLabelProps={{ shrink: true }}
          helperText="At least 8 characters"
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

        <TextField
          fullWidth
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              sx={{
                color: tokens.colors.primary.main,
                '&.Mui-checked': { color: tokens.colors.primary.main },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: 13, color: tokens.colors.text.secondary }}>
              I agree to the{' '}
              <MuiLink href="#" sx={{ color: tokens.colors.primary.main }}>
                Terms
              </MuiLink>{' '}
              and{' '}
              <MuiLink href="#" sx={{ color: tokens.colors.primary.main }}>
                Privacy Policy
              </MuiLink>
            </Typography>
          }
          sx={{ mb: 3, alignItems: 'flex-start' }}
        />

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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Create account'}
        </Button>

        <Typography
          sx={{
            mt: 3,
            textAlign: 'center',
            fontSize: 14,
            color: tokens.colors.text.secondary,
          }}
        >
          Already have an account?{' '}
          <MuiLink
            component={RouterLink}
            to="/login"
            sx={{
              fontWeight: 600,
              color: tokens.colors.primary.main,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
