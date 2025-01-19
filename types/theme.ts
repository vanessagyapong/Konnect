import type { MD3Theme } from 'react-native-paper';

export interface CustomColors {
  upvote: string;
  downvote: string;
  link: string;
  verified: string;
  gold: string;
  moderator: string;
  admin: string;
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  sm: Shadow;
  md: Shadow;
  lg: Shadow;
}

export interface Theme extends MD3Theme {
  dark: boolean;
  roundness: number;
  shadows: Shadows;
  colors: MD3Theme['colors'] & CustomColors;
}