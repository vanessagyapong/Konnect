import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Teal colors
const teal = {
  main: '#009B77',
  light: '#4ECBB5',
  dark: '#006B52'
};

// Coral colors
const coral = {
  main: '#FF6B6B',
  light: '#FF9B9B',
  dark: '#CC4B4B'
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
    primary: teal.main,
    onPrimary: '#FFFFFF',
    primaryContainer: teal.light,
    onPrimaryContainer: teal.dark,
    secondary: coral.main,
    onSecondary: '#FFFFFF',
    secondaryContainer: coral.light,
    onSecondaryContainer: coral.dark,
    tertiary: coral.main,
    onTertiary: '#FFFFFF',
    tertiaryContainer: coral.light,
    onTertiaryContainer: coral.dark,
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#FF4B4B',
  },
  roundness: 12,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: teal.light,
    onPrimary: teal.dark,
    primaryContainer: teal.dark,
    onPrimaryContainer: teal.light,
    secondary: coral.light,
    onSecondary: coral.dark,
    secondaryContainer: coral.dark,
    onSecondaryContainer: coral.light,
    tertiary: coral.light,
    onTertiary: coral.dark,
    tertiaryContainer: coral.dark,
    onTertiaryContainer: coral.light,
    background: '#121212',
    surface: '#121212',
    error: '#FF6B6B',
  },
  roundness: 12,
}; 