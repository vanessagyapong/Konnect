import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function CommunityLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { 
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="[id]/post/[postId]" />
    </Stack>
  );
} 