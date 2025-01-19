import { Redirect, Stack } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const AuthLayout = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect  href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: 'slide_from_right',
      }}
      initialRouteName="login"
    >
      <Stack.Screen 
        name="login"
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen 
        name="register"
        options={{
          title: 'Create Account',
        }}
      />
      <Stack.Screen 
        name="forgot-password"
        options={{
          title: 'Reset Password',
        }}
      />
    </Stack>
  );
};

export default AuthLayout; 