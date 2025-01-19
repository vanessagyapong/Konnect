import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { sharedStyles } from '../theme/styles';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedView = Animated.createAnimatedComponent(View);

export function SplashScreen() {
  const { theme } = useTheme();

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
        size={80} 
        color={theme.colors.primary} 
        style={{ marginBottom: 20 }}
      />
      <Text 
        variant="headlineMedium" 
        style={{ 
          color: theme.colors.onSurface,
          marginBottom: 40,
          fontWeight: 'bold'
        }}
      >
        Konnect
      </Text>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </AnimatedView>
  );
} 