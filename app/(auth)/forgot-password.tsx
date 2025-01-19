import { View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useState, useRef } from 'react';
import { sharedStyles } from '../../theme/styles';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeOut,
  SlideInRight,
  withSpring,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput as RNTextInput } from 'react-native';
import { FormTextInput } from '@/components/FormTextInput';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<RNTextInput>(null);

  const handleResetPassword = async () => {
    try {
      setError('');
      setLoading(true);
      Keyboard.dismiss();

      scale.value = withSequence(
        withSpring(0.95),
        withSpring(1)
      );

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // TODO: Implement actual password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-50, { duration: 300 });
      
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 2000);
    } catch (err) {
      setError('Failed to send reset email');
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
    <SafeAreaView
      style={[sharedStyles.container, { 
        backgroundColor: theme.colors.background, 
        flexDirection: "column", 
        justifyContent: "space-between" 
      }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View 
            style={[{ flex: 1, justifyContent: 'space-between' }, containerStyle]}
          >
            <Animated.View 
              entering={FadeInDown.duration(800).springify()}
              style={[sharedStyles.header, { marginTop: 40 }]}
            >
              <MaterialCommunityIcons 
                name="lock-reset" 
                size={40} 
                color={theme.colors.primary} 
                style={{ marginBottom: 20 }}
              />
              <Text variant="headlineMedium" style={[sharedStyles.headerTitle, { color: theme.colors.onSurface }]}>
                Reset your password
              </Text>
              <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                We'll send you a reset link
              </Text>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.duration(800).springify()}
              style={{ width: '100%', maxWidth: 400, alignSelf: 'center', marginBottom: 20 }}
            >
              <AnimatedSurface style={[sharedStyles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
                <View style={{ 
                  borderRadius: theme.roundness * 2,
                  overflow: 'hidden',
                  backgroundColor: theme.colors.surfaceVariant,
                }}>
                  {success ? (
                    <Animated.View 
                      entering={SlideInRight.duration(400)}
                      style={{ alignItems: 'center' }}
                    >
                      <MaterialCommunityIcons 
                        name="check-circle" 
                        size={48} 
                        color={theme.colors.primary} 
                        style={{ marginBottom: 16 }}
                      />
                      <Text variant="titleMedium" style={{ color: theme.colors.onSurface, textAlign: 'center' }}>
                        Reset link sent!
                      </Text>
                      <Text 
                        variant="bodyMedium" 
                        style={{ 
                          color: theme.colors.onSurfaceVariant, 
                          textAlign: 'center',
                          marginTop: 8 
                        }}
                      >
                        Check your email for instructions
                      </Text>
                    </Animated.View>
                  ) : (
                    <>
                      <Animated.View 
                        entering={SlideInRight.duration(400)}
                        style={sharedStyles.inputContainer}
                      >
                        <FormTextInput
                          ref={emailInputRef}
                          placeholder="Email"
                          value={email}
                          onChangeText={setEmail}
                          autoCapitalize="none"
                          autoComplete="email"
                          keyboardType="email-address"
                          returnKeyType="send"
                          onSubmitEditing={handleResetPassword}
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

                      <Animated.View style={buttonStyle}>
                        <Button
                          mode="contained"
                          onPress={handleResetPassword}
                          loading={loading}
                          disabled={loading}
                          contentStyle={{ paddingVertical: 8 }}
                          style={{ borderRadius: theme.roundness }}
                        >
                          Send reset link
                        </Button>
                      </Animated.View>
                    </>
                  )}
                </View>
              </AnimatedSurface>

              <Animated.View 
                entering={FadeInUp.duration(400).delay(500)}
                style={[sharedStyles.row, { justifyContent: 'center', marginTop: 16 }]}
              >
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Remember your password?{' '}
                </Text>
                <Link href="/(auth)/login" asChild>
                  <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                    Sign in
                  </Text>
                </Link>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 