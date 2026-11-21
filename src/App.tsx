import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AppRouter from './app/router/AppRouter';
import { tokens } from './theme/tokens';

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.colors.primary.main,
      light: tokens.colors.primary.light,
      dark: tokens.colors.primary.dark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.colors.secondary.main,
    },
    background: {
      default: tokens.colors.background.default,
      paper: tokens.colors.background.paper,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
    },
  },
  typography: {
    fontFamily: tokens.fontFamily.body,
    h1: { fontFamily: tokens.fontFamily.heading, fontWeight: 700 },
    h2: { fontFamily: tokens.fontFamily.heading, fontWeight: 700 },
    h3: { fontFamily: tokens.fontFamily.heading, fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: tokens.radius.sm },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
