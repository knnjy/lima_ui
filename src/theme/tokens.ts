export const tokens = {
  colors: {
    primary: {
      main: '#163D29',
      light: '#2E663A',
      dark: '#0F2A1C',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#708D36',
      light: '#B7CC93',
      dark: '#5C7A26',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#F7F8F2',
      paper: '#FFFFFF',
      features: '#D9E4C3',
      cta: '#2E663A',
    },
    text: {
      primary: '#163D29',
      secondary: '#5F675A',
      muted: '#4E5951',
      inverse: '#FFFFFF',
      light: '#DCECE0',
    },
    accent: {
      orange: '#B85F10',
      green: '#4A7448',
    },
    border: '#E3E1D8',
    divider: '#E3E1D8',
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 3,
    md: 8,
    lg: 3,
    xl: 20,
    full: 999,
  },
  fontFamily: {
    body: "'Inter', sans-serif",
    heading: "'Plus Jakarta Sans', sans-serif",
  },
} as const;
