import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter, useSegments, Slot } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { sharedStyles } from '../theme/styles';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedView = Animated.createAnimatedComponent(View);

export function ProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedRoute = segments[0] === '(tabs)' || segments[0] === 'post';

    if (!isAuthenticated && inProtectedRoute && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <AnimatedView 
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(400)}
        style={[
          sharedStyles.container, 
          sharedStyles.center, 
          { backgroundColor: theme.colors.background }
        ]}
      >
        <MaterialCommunityIcons 
          name="message-text" 
          size={60} 
          color={theme.colors.primary} 
          style={{ marginBottom: 20 }}
        />
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </AnimatedView>
    );
  }

  // Don't render protected routes if not authenticated
  if (!isAuthenticated && (segments[0] === '(tabs)' || segments[0] === 'post')) {
    return <Slot />;
  }

  return <Slot />;
} 