import { View, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/contexts/ThemeContext';
import { spacing } from '@/theme';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');

  const tabWidth = width / 5; // Exactly 5 tabs

  return (
    <View style={{ 
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      height: 60,
      borderTopColor: theme.colors.surfaceVariant,
      borderTopWidth: 1,
      paddingBottom: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={{ 
              width: tabWidth,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{
              width: 48,
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
              backgroundColor: isFocused ? theme.colors.primaryContainer : 'transparent',
            }}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant,
                size: 24,
              })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
} 