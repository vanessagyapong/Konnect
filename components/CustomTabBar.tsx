import { View, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const { width } = Dimensions.get('window');

  // Filter out admin route if user is not admin
  const visibleRoutes = state.routes.filter(route => {
    if (route.name === 'admin') {
      return isAdmin();
    }
    return true;
  });

  const tabWidth = width / visibleRoutes.length;

  return (
    <View style={{ 
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      height: 80,
      borderTopColor: theme.colors.surfaceVariant,
      borderTopWidth: 1,
      paddingBottom: 20, // Account for safe area on newer iPhones
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      {visibleRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === visibleRoutes.indexOf(route);

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
              backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              shadowColor: isFocused ? '#fff' : 'transparent',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: isFocused ? 0.5 : 0,
              shadowRadius: 8,
              elevation: isFocused ? 5 : 0,
            }}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? '#fff' : theme.colors.onSurfaceVariant,
                size: 24,
              })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
} 