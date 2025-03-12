import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Deep green colors
const green = {
  main: '#1B4332',  // Deep forest green
  light: '#2D6A4F', // Medium forest green
  dark: '#081C15'   // Very dark green
};

// Beige colors
const beige = {
  main: '#DDD5C8',   // Soft beige
  light: '#F1EBE4',  // Light beige
  dark: '#C8B9A9'    // Dark beige
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: green.main,
    onPrimary: '#FFFFFF',
    primaryContainer: green.light,
    onPrimaryContainer: beige.light,
    secondary: green.light,
    onSecondary: '#FFFFFF',
    secondaryContainer: beige.main,
    onSecondaryContainer: green.dark,
    tertiary: green.dark,
    onTertiary: beige.light,
    tertiaryContainer: beige.light,
    onTertiaryContainer: green.dark,
    background: beige.light,
    surface: beige.light,
    surfaceVariant: beige.main,
    error: '#B00020',
  },
  roundness: 12,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: green.light,
    onPrimary: beige.light,
    primaryContainer: green.main,
    onPrimaryContainer: beige.light,
    secondary: beige.main,
    onSecondary: green.dark,
    secondaryContainer: green.dark,
    onSecondaryContainer: beige.light,
    tertiary: beige.dark,
    onTertiary: green.dark,
    tertiaryContainer: green.dark,
    onTertiaryContainer: beige.light,
    background: green.dark,
    surface: green.dark,
    surfaceVariant: green.main,
    error: '#CF6679',
  },
  roundness: 12,
}; 