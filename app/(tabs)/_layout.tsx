import { Redirect, Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { CustomTabBar } from '@/components/CustomTabBar';

export default function TabLayout() {
  const { theme } = useTheme();
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerShown: false,
        headerTintColor: theme.colors.onSurface,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size+6} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notice-board"
        options={{
          title: 'Notice Board',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bulletin-board" size={size+6} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size+12} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" size={size+6} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-tie" size={size+6} color={color} />
          ),
        }}
      />

      {isAdmin() && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="shield-account" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}
