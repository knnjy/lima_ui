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
  sizes: {
    farmCardMinHeight: 150,
  },
  radius: {
    sm: 3,
    md: 8,
    lg: 13,
    xl: 20,
    panel: 12,
    image: 22,
    full: 999,
  },
  fontFamily: {
    body: "'Inter', sans-serif",
    heading: "'Plus Jakarta Sans', sans-serif",
  },
  typography: {
    caption: 12,
    small: 13,
    body: 14,
    subtitle: 15,
    bodyLarge: 16,
    cardTitleSmall: 26,
    cardTitleLarge: 30,
    logo: 28,
    heroSmall: 36,
    heroMedium: 42,
    heroLarge: 47,
  },
  fontWeight: {
    medium: 500,
    semibold: 600,
  },
  shadows: {
    card: '0 4px 24px rgba(22, 61, 41, 0.06)',
  },
} as const;
