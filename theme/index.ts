// theme.ts
import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import type { Theme } from '../types/theme';

const baseFont = {
  fontFamily: 'System',
  letterSpacing: 0.25,  // Slightly increased for better readability
  textAlign: 'left' as const,
};

type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

const fontConfig = {
  displayLarge: { ...baseFont, fontSize: 56, lineHeight: 64, fontWeight: "400" as FontWeight },
  displayMedium: { ...baseFont, fontSize: 44, lineHeight: 52, fontWeight: "400" as FontWeight },
  displaySmall: { ...baseFont, fontSize: 36, lineHeight: 44, fontWeight: "400" as FontWeight },
  headlineLarge: { ...baseFont, fontSize: 32, lineHeight: 40, fontWeight: "500" as FontWeight },
  headlineMedium: { ...baseFont, fontSize: 28, lineHeight: 36, fontWeight: "500" as FontWeight },
  headlineSmall: { ...baseFont, fontSize: 24, lineHeight: 32, fontWeight: "500" as FontWeight },
  titleLarge: { ...baseFont, fontSize: 22, lineHeight: 28, fontWeight: "500" as FontWeight },
  titleMedium: { ...baseFont, fontSize: 16, lineHeight: 24, fontWeight: "500" as FontWeight },
  titleSmall: { ...baseFont, fontSize: 14, lineHeight: 20, fontWeight: "500" as FontWeight },
  bodyLarge: { ...baseFont, fontSize: 16, lineHeight: 24, fontWeight: "400" as FontWeight },
  bodyMedium: { ...baseFont, fontSize: 14, lineHeight: 20, fontWeight: "400" as FontWeight },
  bodySmall: { ...baseFont, fontSize: 12, lineHeight: 16, fontWeight: "400" as FontWeight },
  labelLarge: { ...baseFont, fontSize: 14, lineHeight: 20, fontWeight: "500" as FontWeight },
  labelMedium: { ...baseFont, fontSize: 12, lineHeight: 16, fontWeight: "500" as FontWeight },
  labelSmall: { ...baseFont, fontSize: 11, lineHeight: 16, fontWeight: "500" as FontWeight },
};

const fonts = configureFonts({ config: fontConfig });

// Custom colors that extend MD3Theme colors
const customColors = {
  upvote: '#32CD32',      // Lime Green for positive actions
  downvote: '#7C98B3',    // Muted Blue Gray
  link: '#1E90FF',        // Sky Blue for interactive elements
  verified: '#FFD700',    // Bright Yellow for achievements
  gold: '#FFD700',        // Bright Yellow
  moderator: '#1E90FF',   // Sky Blue
  admin: '#FF69B4',       // Hot Pink
  active: '#32CD32',      // Lime Green for general active states
  bottomNavActive: '#000000', // Pure Black for bottom nav active icons
};

// Elevation/Shadow styles
export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Light theme shadow configuration
export const lightTheme: Theme = {
  ...MD3LightTheme,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
    primary: '#1E90FF',           // Sky Blue
    primaryContainer: '#E6F3FF',  // Light Sky Blue
    secondary: '#32CD32',         // Lime Green
    secondaryContainer: '#E8F8E8', // Light Lime
    tertiary: '#FF69B4',          // Hot Pink
    tertiaryContainer: '#FFE6F3', // Light Pink
    background: '#FFFFFF',        // Pure White
    surface: '#FFFFFF',           // Pure White
    surfaceVariant: '#F8F9FA',    // Off White
    onSurface: '#2C3E50',         // Dark Blue Gray
    onSurfaceVariant: '#34495E',  // Medium Blue Gray
    outline: '#FFD700',           // Bright Yellow
    error: '#FF4757',             // Bright Red
    onPrimary: '#FFFFFF',         // White
    onSecondary: '#FFFFFF',       // White
    onPrimaryContainer: '#004C99', // Dark Blue
    onSecondaryContainer: '#1B611B', // Dark Green
  },
  dark: false,
  roundness: 16,
  shadows: shadows,  // Add light mode shadows
};

// Dark theme configuration
export const darkTheme: Theme = {
  ...MD3DarkTheme,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors,
    primary: '#1E90FF',           // Sky Blue
    primaryContainer: '#004C99',  // Dark Blue
    secondary: '#32CD32',         // Lime Green
    secondaryContainer: '#1B611B', // Dark Green
    tertiary: '#FF69B4',          // Hot Pink
    tertiaryContainer: '#99004D', // Dark Pink
    background: '#1A1A2E',        // Deep Navy
    surface: '#1E1E35',          // Navy Blue
    surfaceVariant: '#232339',   // Medium Navy
    onSurface: '#E6F3FF',        // Light Sky Blue
    onSurfaceVariant: '#B8E2FF', // Pale Blue
    outline: '#FFD700',          // Bright Yellow
    error: '#FF4757',            // Bright Red
    onPrimary: '#FFFFFF',        // White
    onSecondary: '#FFFFFF',      // White
    onPrimaryContainer: '#E6F3FF', // Light Sky Blue
    onSecondaryContainer: '#E8F8E8', // Light Lime
  },
  dark: true,
  roundness: 16,
  shadows: shadows,  // Add dark mode shadows
};

// Spacing system (in pixels)
export const spacing = {
  xxs: 4,    // Increased from 2
  xs: 8,     // Increased from 4
  sm: 12,    // Increased from 8
  md: 20,    // Increased from 16
  lg: 28,    // Increased from 24
  xl: 36,    // Increased from 32
  xxl: 44,   // Increased from 40
};

// Border radius system
export const borderRadius = {
  xs: 8,     // Increased from 4
  sm: 12,    // Increased from 8
  md: 16,    // Increased from 12
  lg: 20,    // Increased from 16
  xl: 28,    // Increased from 24
  full: 9999,
};

// Add backdrop blur values for glass effect
export const blur = {
  sm: 4,
  md: 8,
  lg: 12,
};

// Helper function to get theme based on scheme
export const getTheme = (scheme: 'light' | 'dark' | 'system', systemScheme: 'light' | 'dark'): Theme => {
  if (scheme === 'system') {
    return systemScheme === 'dark' ? darkTheme : lightTheme;
  }
  return scheme === 'dark' ? darkTheme : lightTheme;
};