import { View, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, ProgressBar, Chip, HelperText } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useCallback, useRef } from 'react';
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
  useAnimatedProps,
  interpolate,
  useSharedValue,
  withSequence,
  Layout,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput as RNTextInput } from 'react-native';
import { FormTextInput } from '@/components/FormTextInput';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

type Step = 1 | 2;

const TOTAL_STEPS = 2;

const departments = [
  'Computer Science',
  'Engineering',
  'Business',
  'Arts',
  'Science',
  'Medicine',
] as const;

const interests = [
  'Academic News',
  'Research',
  'Campus Events',
  'Sports',
  'Student Activities',
  'Career Opportunities',
  'Technology',
  'Arts & Culture',
  'Science',
  'Health & Wellness',
  'Campus Services',
  'Library Updates',
] as const;

const calculateProgress = (currentStep: number): number => {
  return Math.round((currentStep / TOTAL_STEPS) * 100) / 100;
};

export default function RegisterScreen() {
  const { theme } = useTheme();
  const { signUp } = useAuth();
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const progressValue = useSharedValue(0.5);

  const [step, setStep] = useState<Step>(1);
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const idNumberInputRef = useRef<RNTextInput>(null);
  const emailInputRef = useRef<RNTextInput>(null);
  const fullNameInputRef = useRef<RNTextInput>(null);
  const passwordInputRef = useRef<RNTextInput>(null);
  const confirmPasswordInputRef = useRef<RNTextInput>(null);
  const departmentInputRef = useRef<RNTextInput>(null);

  const handleNext = () => {
    setError('');
    scale.value = withSequence(
      withSpring(0.98),
      withSpring(1)
    );

    if (step === 1) {
      if (!idNumber) {
        setError('ID number is required');
        return;
      }
      if (!fullName || fullName.length < 3) {
        setError('Full name is required');
        return;
      }
      if (!email || !validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!password || password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!department) {
        setError('Please select your department');
        return;
      }
      progressValue.value = withSpring(1);
      setStep(2);
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 2) {
      progressValue.value = withSpring(0.5);
    }
    setStep(prev => (prev - 1) as Step);
  };

  const handleRegister = async () => {
    try {
      setError('');
      setLoading(true);
      Keyboard.dismiss();

      scale.value = withSequence(
        withSpring(0.95),
        withSpring(1)
      );

      if (selectedInterests.length === 0) {
        setError('Please select at least one interest');
        return;
      }

      await signUp({
        email,
        password,
        idNumber,
        fullName,
        department,
      });
      
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-50, { duration: 300 });
      
    } catch (err) {
      setError('Failed to create account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`
  }));

  const animatedProps = useAnimatedProps(() => ({
    progress: progressValue.value
  }));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View 
            entering={SlideInRight.duration(400)} 
            exiting={SlideOutLeft.duration(200)}
            style={{ width: '100%' }}
            layout={Layout.springify()}
          >
            <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.onSurface }}>
              Create your account
            </Text>

            <View style={sharedStyles.inputContainer}>
              <FormTextInput
                ref={idNumberInputRef}
                placeholder="ID Number"
                value={idNumber}
                onChangeText={setIdNumber}
                autoCapitalize="characters"
                nextInputRef={fullNameInputRef}
                helperText="Enter your ID number"
              />
            </View>

            <View style={sharedStyles.inputContainer}>
              <FormTextInput
                ref={fullNameInputRef}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                nextInputRef={emailInputRef}
              />
            </View>

            <View style={sharedStyles.inputContainer}>
              <FormTextInput
                ref={emailInputRef}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                nextInputRef={passwordInputRef}
              />
            </View>

            <View style={sharedStyles.inputContainer}>
              <FormTextInput
                ref={passwordInputRef}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                nextInputRef={confirmPasswordInputRef}
                isPassword
              />
            </View>

            <View style={sharedStyles.inputContainer}>
              <FormTextInput
                ref={confirmPasswordInputRef}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                nextInputRef={departmentInputRef}
                isPassword
              />
            </View>

            <View style={sharedStyles.inputContainer}>
              <FormTextInput
                ref={departmentInputRef}
                placeholder="Department"
                value={department}
                onChangeText={setDepartment}
              />
              <HelperText type="info">
                Select your department from: {departments.join(', ')}
              </HelperText>
            </View>
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View 
            entering={SlideInRight.duration(400)} 
            exiting={SlideOutLeft.duration(200)}
            style={{ width: '100%' }}
            layout={Layout.springify()}
          >
            <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.onSurface }}>
              Select your interests
            </Text>
            <Text variant="bodyMedium" style={{ marginBottom: 24, color: theme.colors.onSurfaceVariant }}>
              Choose topics you'd like to follow
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {interests.map((interest) => (
                <Chip
                  key={interest}
                  selected={selectedInterests.includes(interest)}
                  onPress={() => toggleInterest(interest)}
                  style={{ marginBottom: 8 }}
                >
                  {interest}
                </Chip>
              ))}
            </View>
          </Animated.View>
        );
    }
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
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
                  Create Account
                </Text>
                <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                  Join Connect
                </Text>
              </Animated.View>

              <Animated.View 
                entering={FadeInUp.duration(800).springify()}
                style={{ width: '100%', maxWidth: 400, alignSelf: 'center', marginBottom: 20 }}
              >
                <View style={{ marginBottom: 24 }}>
                  <ProgressBar progress={progressValue.value} />
                  <Text variant="bodySmall" style={{ marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                    Step {step} of {TOTAL_STEPS}
                  </Text>
                </View>

                <AnimatedSurface style={[sharedStyles.card, { backgroundColor: "transparent" }]}>
                  <View style={{ 
                    borderRadius: theme.roundness * 2,
                    overflow: 'hidden',         
                    paddingHorizontal: 17,
                  }}>
                    {renderStep()}

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

                    <View style={[sharedStyles.buttonContainer, { marginTop: 24 }]}>
                      {step > 1 && (
                        <Button
                          mode="outlined"
                          onPress={handleBack}
                          style={{ borderRadius: theme.roundness }}
                          contentStyle={{ paddingVertical: 8 }}
                        >
                          Back
                        </Button>
                      )}
                      <Animated.View style={buttonStyle}>
                        <Button
                          mode="contained"
                          onPress={step === TOTAL_STEPS ? handleRegister : handleNext}
                          loading={loading}
                          disabled={loading}
                          style={{ borderRadius: theme.roundness }}
                          contentStyle={{ paddingVertical: 8 }}
                        >
                          {step === TOTAL_STEPS ? 'Create Account' : 'Next'}
                        </Button>
                      </Animated.View>
                    </View>
                  </View>
                </AnimatedSurface>

                <Animated.View 
                  entering={FadeInUp.duration(400).delay(500)}
                  style={[sharedStyles.row, { justifyContent: 'center', marginTop: 16 }]}
                >
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Already have an account?{' '}
                  </Text>
                  <Link href="/(auth)/login" asChild>
                    <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                      Sign in
                    </Text>
                  </Link>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}