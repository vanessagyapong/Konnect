import { View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, IconButton } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useRef } from 'react';
import { sharedStyles } from '../../theme/styles';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  withSpring,
  withTiming,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormTextInput } from '@/components/FormTextInput';
import { TextInput as RNTextInput } from 'react-native';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);
const AnimatedButton = Animated.createAnimatedComponent(Button);

const Login = () => {
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<RNTextInput>(null);

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      Keyboard.dismiss();

      scale.value = withSequence(
        withSpring(0.95),
        withSpring(1)
      );

      if (!idNumber || !password) {
        setError('ID number and password are required');
        return;
      }

      await signIn(idNumber, password);
      
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-50, { duration: 300 });
      
    } catch (err) {
      setError('Invalid ID number or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={[{ flex: 1, justifyContent: 'space-between' }, containerStyle]}>
            <Animated.View 
              entering={FadeInDown.duration(800).springify()}
              style={[sharedStyles.header, { marginTop: 40 }]}
            >
              <MaterialCommunityIcons 
                name="school" 
                size={40} 
                color={theme.colors.primary} 
                style={{ marginBottom: 20 }}
              />
              <Text variant="headlineMedium" style={[sharedStyles.headerTitle, { color: theme.colors.onSurface }]}>
                Sign in to Connect
              </Text>
              <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                Welcome back
              </Text>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.duration(800).springify()}
              style={{ width: '100%', maxWidth: 400, alignSelf: 'center', marginBottom: 20 }}
            >
              <AnimatedSurface style={[sharedStyles.card, { backgroundColor: "transparent" }]}>
                <View style={{ 
                  borderRadius: theme.roundness * 2,
                  overflow: 'hidden',         
                  paddingHorizontal: 17,
                }}>
                  <Animated.View 
                    entering={SlideInRight.duration(400).delay(200)}
                    style={sharedStyles.inputContainer}
                  >
                    <FormTextInput
                      placeholder="ID Number"
                      value={idNumber}
                      onChangeText={setIdNumber}
                      autoCapitalize="characters"
                      keyboardType="default"
                      nextInputRef={passwordInputRef}
                      helperText="Enter your ID number"
                    />
                  </Animated.View>

                  <Animated.View 
                    entering={SlideInRight.duration(400).delay(300)}
                    style={sharedStyles.inputContainer}
                  >
                    <FormTextInput
                      ref={passwordInputRef}
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      returnKeyType="go"
                      onSubmitEditing={handleLogin}
                      isPassword
                    />
                  </Animated.View>

                  {error ? (
                    <Animated.View 
                      entering={FadeInDown.duration(400).springify()}
                      exiting={FadeOut.duration(200)}
                    >
                      <Text style={[sharedStyles.errorText, { color: theme.colors.error }]}>
                        {error}
                      </Text>
                    </Animated.View>
                  ) : null}

                  <Animated.View 
                    entering={SlideInRight.duration(400).delay(400)}
                    style={sharedStyles.buttonContainer}
                  >
                    <Animated.View style={buttonStyle}>
                      <Button
                        mode="contained"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={loading}
                        contentStyle={{ paddingVertical: 8 }}
                        style={{ borderRadius: theme.roundness }}
                      >
                        Sign in
                      </Button>
                    </Animated.View>

                    <Link href="/(auth)/register" asChild>
                      <Button 
                        mode="outlined" 
                        style={{ borderRadius: theme.roundness }}
                        contentStyle={{ paddingVertical: 8 }}
                      >
                        Create account
                      </Button>
                    </Link>
                  </Animated.View>
                </View>
              </AnimatedSurface>

              <Animated.View 
                entering={FadeInUp.duration(400).delay(500)}
                style={[sharedStyles.row, { justifyContent: 'center', marginTop: 16 }]}
              >
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Forgot your password?{' '}
                </Text>
                <Link href="/(auth)/forgot-password" asChild>
                  <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                    Reset it here
                  </Text>
                </Link>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;