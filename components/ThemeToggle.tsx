import React from 'react';
import { View } from 'react-native';
import { List, Switch, Text, TouchableRipple } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { sharedStyles } from '../theme/styles';

export function ThemeToggle() {
  const { theme, themeMode, setThemeMode, isDark } = useTheme();

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setThemeMode(newMode);
  };

  return (
    <List.Section>
      <List.Subheader>Theme</List.Subheader>
      
      <TouchableRipple onPress={() => handleThemeChange('light')}>
        <List.Item
          title="Light"
          left={() => (
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={24}
              color={theme.colors.onSurface}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={themeMode === 'light' ? 'radiobox-marked' : 'radiobox-blank'}
            />
          )}
        />
      </TouchableRipple>

      <TouchableRipple onPress={() => handleThemeChange('dark')}>
        <List.Item
          title="Dark"
          left={() => (
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={24}
              color={theme.colors.onSurface}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={themeMode === 'dark' ? 'radiobox-marked' : 'radiobox-blank'}
            />
          )}
        />
      </TouchableRipple>

      <TouchableRipple onPress={() => handleThemeChange('system')}>
        <List.Item
          title="System"
          description="Follows your device settings"
          left={() => (
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={theme.colors.onSurface}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={themeMode === 'system' ? 'radiobox-marked' : 'radiobox-blank'}
            />
          )}
        />
      </TouchableRipple>
    </List.Section>
  );
} 