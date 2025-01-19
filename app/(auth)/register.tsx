import { View, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, ProgressBar, Chip, SegmentedButtons, HelperText } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth, UserType } from '../../contexts/AuthContext';
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

type Step = 1 | 2 | 3;
type StaffType = 'academic' | 'non-academic';

const TOTAL_STEPS = 3;

const departments = [
  'Computer Science',
  'Engineering',
  'Business',
  'Arts',
  'Science',
  'Medicine',
] as const;

const majors = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Business Administration',
  'Marketing',
  'Finance',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Medicine',
  'Nursing',
  'Psychology',
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
  const progressValue = useSharedValue(0.33);

  const [step, setStep] = useState<Step>(1);
  const [userType, setUserType] = useState<UserType>('student');
  const [staffType, setStaffType] = useState<StaffType>('academic');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [yearLevel, setYearLevel] = useState<string>('');
  const [position, setPosition] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const idNumberInputRef = useRef<RNTextInput>(null);
  const emailInputRef = useRef<RNTextInput>(null);
  const fullNameInputRef = useRef<RNTextInput>(null);
  const passwordInputRef = useRef<RNTextInput>(null);
  const confirmPasswordInputRef = useRef<RNTextInput>(null);
  const departmentInputRef = useRef<RNTextInput>(null);
  const yearLevelInputRef = useRef<RNTextInput>(null);
  const positionInputRef = useRef<RNTextInput>(null);

  const handleNext = () => {
    setError('');
    scale.value = withSequence(
      withSpring(0.98),
      withSpring(1)
    );

    if (step === 1) {
      progressValue.value = withSpring(0.66);
      setStep(2);
    } else if (step === 2) {
      if (!idNumber || !validateIdNumber(idNumber)) {
        setError(`Invalid ${userType} ID format. Use ${userType === 'student' ? 'STU' : 'STF'} followed by 6 digits`);
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
      if (userType === 'student') {
        if (!yearLevel || isNaN(Number(yearLevel))) {
          setError('Please enter a valid year level');
          return;
        }
        if (!department) {
          setError('Please select your department');
          return;
        }
      }
      progressValue.value = withSpring(1);
      setStep(3);
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 2) {
      progressValue.value = withSpring(0.33);
    } else if (step === 3) {
      progressValue.value = withSpring(0.66);
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
        userType,
        idNumber,
        fullName,
        department: userType === 'student' ? department : department,
        yearLevel: userType === 'student' ? Number(yearLevel) : undefined,
        position: userType === 'staff' ? position : undefined,
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

  const validateIdNumber = (id: string) => {
    const studentPattern = /^STU\d{6}$/;
    const staffPattern = /^STF\d{6}$/;
    return userType === 'student' ? studentPattern.test(id) : staffPattern.test(id);
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
              Are you a student or staff member?
            </Text>

            <SegmentedButtons
              value={userType}
              onValueChange={value => setUserType(value as UserType)}
              buttons={[
                { value: 'student', label: 'Student' },
                { value: 'staff', label: 'Staff' },
              ]}
              style={{ marginBottom: 24 }}
            />

            {userType === 'staff' && (
              <>
                <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.onSurface }}>
                  What type of staff member are you?
                </Text>

                <SegmentedButtons
                  value={staffType}
                  onValueChange={value => setStaffType(value as StaffType)}
                  buttons={[
                    { value: 'academic', label: 'Academic' },
                    { value: 'non-academic', label: 'Non-Academic' },
                  ]}
                />
              </>
            )}
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
            <FormTextInput
              ref={idNumberInputRef}
              placeholder={`${userType === 'student' ? 'Student' : 'Staff'} ID`}
              value={idNumber}
              onChangeText={setIdNumber}
              autoCapitalize="characters"
              helperText={`Format: ${userType === 'student' ? 'STU' : 'STF'}123456`}
            />

            <View style={{ height: 16 }} />

            <FormTextInput
              ref={fullNameInputRef}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <View style={{ height: 16 }} />

            <FormTextInput
              ref={emailInputRef}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={{ height: 16 }} />

            <FormTextInput
              ref={passwordInputRef}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              isPassword
              helperText="At least 8 characters"
            />

            <View style={{ height: 16 }} />

            {userType === 'student' ? (
              <>
                <FormTextInput
                  ref={yearLevelInputRef}
                  placeholder="Year Level"
                  value={yearLevel}
                  onChangeText={setYearLevel}
                  keyboardType="number-pad"
                />

                <View style={{ height: 16 }} />

                <Text variant="bodyMedium" style={{ marginBottom: 8, color: theme.colors.onSurfaceVariant }}>
                  Select your major:
                </Text>

                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={{ marginBottom: 16 }}
                >
                  {majors.map((m) => (
                    <Chip
                      key={m}
                      selected={department === m}
                      onPress={() => setDepartment(m)}
                      style={{ marginRight: 8 }}
                    >
                      {m}
                    </Chip>
                  ))}
                </ScrollView>
              </>
            ) : (
              <>
                <Text variant="bodyMedium" style={{ marginBottom: 8, color: theme.colors.onSurfaceVariant }}>
                  Select your department:
                </Text>

                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={{ marginBottom: 16 }}
                >
                  {departments.map((d) => (
                    <Chip
                      key={d}
                      selected={department === d}
                      onPress={() => setDepartment(d)}
                      style={{ marginRight: 8 }}
                    >
                      {d}
                    </Chip>
                  ))}
                </ScrollView>
              </>
            )}
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View 
            entering={SlideInRight.duration(400)} 
            exiting={SlideOutLeft.duration(200)}
            style={{ width: '100%' }}
            layout={Layout.springify()}
          >
            <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.onSurface }}>
              What topics are you interested in?
            </Text>
            <Text variant="bodyMedium" style={{ marginBottom: 16, color: theme.colors.onSurfaceVariant }}>
              Select all that apply:
            </Text>

            <ScrollView style={{ maxHeight: 300 }}>
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
            </ScrollView>
          </Animated.View>
        );
    }
  };

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
                name="school" 
                size={40} 
                color={theme.colors.primary} 
                style={{ marginBottom: 20 }}
              />
              <Text variant="headlineMedium" style={[sharedStyles.headerTitle, { color: theme.colors.onSurface }]}>
                Create your account
              </Text>
              <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                Step {step} of {TOTAL_STEPS}
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
                  paddingTop: 5,
                }}>
                  <View style={{ 
                    marginBottom: 30, 
                    height: 4, 
                    backgroundColor: theme.colors.surfaceVariant, 
                    borderRadius: 2 ,
                    }}>
                    <Animated.View
                      style={[
                        { 
                          height: '100%', 
                          backgroundColor: theme.colors.primary,
                          borderRadius: 2,
                          zIndex: 100,
                        },
                        progressStyle
                      ]}
                    />
                  </View>

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

                  <Animated.View 
                    style={[sharedStyles.buttonContainer, { flexDirection: 'row' }]}
                    layout={Layout.springify()}
                  >
                    {step > 1 && (
                      <Animated.View 
                        entering={FadeInUp.duration(400)}
                        style={{ flex: 1, marginRight: 8 }}
                      >
                        <Button
                          mode="outlined"
                          onPress={handleBack}
                          style={{ borderRadius: theme.roundness }}
                          contentStyle={{ paddingVertical: 8 }}
                        >
                          Back
                        </Button>
                      </Animated.View>
                    )}
                    <Animated.View style={[buttonStyle, { flex: 1 }]}>
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
                  </Animated.View>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}