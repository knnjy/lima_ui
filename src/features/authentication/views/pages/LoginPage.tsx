
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
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from '../../../../app/layout/AuthLayout';
import { tokens } from '../../../../theme/tokens';
import { useLoginViewModel } from '../../viewModel/LoginUseCase';

export default function LoginPage() {
  const {
    email,
    password,
    showPassword,
    loading,
    error,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
  } = useLoginViewModel();

  return (
    
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to LiMa."
    >
      
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: tokens.radius.md,
            }}
          >
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2.5 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 1.5 }}
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
            color: tokens.colors.primary.contrast,
            fontWeight: 600,
            fontSize: 15,
            borderRadius: tokens.radius.md,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: tokens.colors.primary.light,
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              backgroundColor: tokens.colors.primary.main,
              color: tokens.colors.primary.contrast,
              opacity: 0.7,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Sign in'
          )}
        </Button>

        <Typography
          sx={{
            mt: 3,
            textAlign: 'center',
            fontSize: 13,
            color: tokens.colors.text.secondary,
          }}
        >
          New to LiMa?{' '}
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
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
