import { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text, Surface, List, IconButton, Menu, Divider, Avatar, Button, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  Layout,
  withSequence,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { mockAcademicProfile, mockStudyGroups, mockDepartments } from '@/data/mockUniversityData';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

type ThemeOption = {
  title: string;
  icon: string;
  value: 'light' | 'dark' | 'system';
  index: number;
};

const ThemeOption = ({ title, icon, value, index }: ThemeOption) => {
  const { theme, themeMode: currentTheme, setThemeMode } = useTheme();
  const isSelected = currentTheme === value;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      exiting={FadeOut}
    >
      <TouchableOpacity
        onPress={() => setThemeMode(value)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: isSelected ? theme.colors.primaryContainer : 'transparent',
        }}
      >
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={24}
          color={isSelected ? theme.colors.primary : theme.colors.onSurfaceVariant}
          style={{ marginRight: 16 }}
        />
        <Text style={{ color: isSelected ? theme.colors.primary : theme.colors.onSurface }}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showCommunities, setShowCommunities] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: 1,
    transform: [{ scale: withSpring(1) }]
  }));

  const toggleMenu = useCallback(() => {
    setMenuVisible(prev => !prev);
    rotation.value = withSpring(menuVisible ? 0 : 180);
    scale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );
  }, [menuVisible]);

  const joinedDate = new Date(2023, 8, 15); // Example date

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        {/* Basic User Information */}
        <Animated.View style={[sharedStyles.header, headerStyle]}>
          <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
            <Avatar.Image
              size={100}
              source={{ uri: 'https://ui-avatars.com/api/?name=' + user?.fullName }}
            />
            <Text variant="headlineSmall" style={{ marginTop: spacing.sm }}>
              {user?.fullName || 'User Name'}
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              {user?.email || 'user@example.com'}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: spacing.xs }}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {mockAcademicProfile.major} • Year {mockAcademicProfile.year}
              </Text>
            </View>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: spacing.xs }}>
              Joined {joinedDate.toLocaleDateString()}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.primary, marginTop: spacing.xs }}>
              {user?.userType === 'student' ? 'Student' : 'Staff'}
            </Text>
          </View>
        </Animated.View>

        {/* User Activity and Engagement */}
        <List.Section>
          <Animated.View entering={FadeInDown.duration(500)}>
            <List.Accordion
              title="Activity & Engagement"
              left={props => <List.Icon {...props} icon="chart-timeline-variant" />}
              expanded={showActivities}
              onPress={() => setShowActivities(!showActivities)}
            >
              <List.Item
                title="Joined Communities"
                description={`${mockDepartments.length} communities`}
                left={props => <List.Icon {...props} icon="account-group" />}
                onPress={() => router.push({
                  pathname: "/communities",
                  params: { filter: 'joined' }
                })}
              />
              <List.Item
                title="Saved Posts"
                description="View your saved posts"
                left={props => <List.Icon {...props} icon="bookmark-multiple" />}
                onPress={() => router.push({ pathname: "/saved" })}
              />
              <List.Item
                title="Recent Activity"
                description="View your recent interactions"
                left={props => <List.Icon {...props} icon="clock-outline" />}
                onPress={() => router.push({ pathname: "/activity" })}
              />
            </List.Accordion>
          </Animated.View>
        </List.Section>

        {/* Academic Information */}
        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <List.Accordion
              title="Academic Information"
              left={props => <List.Icon {...props} icon="school" />}
              expanded={showCommunities}
              onPress={() => setShowCommunities(!showCommunities)}
            >
              <List.Item
                title="Major"
                description={mockAcademicProfile.major}
                left={props => <List.Icon {...props} icon="book-open-variant" />}
              />
              {mockAcademicProfile.minor && (
                <List.Item
                  title="Minor"
                  description={mockAcademicProfile.minor}
                  left={props => <List.Icon {...props} icon="book-variant" />}
                />
              )}
              <List.Item
                title="Academic Advisor"
                description={mockAcademicProfile.advisor.name}
                left={props => <List.Icon {...props} icon="account-tie" />}
              />
              <List.Item
                title="Credits"
                description={`${mockAcademicProfile.credits} completed`}
                left={props => <List.Icon {...props} icon="counter" />}
              />
              {mockAcademicProfile.gpa && (
                <List.Item
                  title="GPA"
                  description={mockAcademicProfile.gpa.toFixed(2)}
                  left={props => <List.Icon {...props} icon="chart-line" />}
                />
              )}
            </List.Accordion>
          </Animated.View>
        </List.Section>

        <Divider />

        {/* Preferences and Settings */}
        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <List.Accordion
              title="Preferences & Settings"
              left={props => <List.Icon {...props} icon="cog" />}
              expanded={showPreferences}
              onPress={() => setShowPreferences(!showPreferences)}
            >
              <List.Item
                title="Theme"
                description="Customize app appearance"
                left={props => <List.Icon {...props} icon="palette" />}
                onPress={toggleMenu}
              />
              <List.Item
                title="Notifications"
                description="Manage notification settings"
                left={props => <List.Icon {...props} icon="bell" />}
                onPress={() => router.push({ pathname: "/settings/notifications" })}
              />
              <List.Item
                title="Privacy"
                description="Manage privacy settings"
                left={props => <List.Icon {...props} icon="shield" />}
                onPress={() => router.push({ pathname: "/settings/privacy" })}
              />
              <List.Item
                title="Language"
                description="Change app language"
                left={props => <List.Icon {...props} icon="translate" />}
                onPress={() => router.push({ pathname: "/settings/language" })}
              />
            </List.Accordion>
          </Animated.View>

          {menuVisible && (
            <AnimatedSurface 
              entering={FadeInDown.springify()}
              style={{ backgroundColor: 'transparent', overflow: 'hidden', marginTop: spacing.xs }}
            >
              <ThemeOption title="Light" icon="white-balance-sunny" value="light" index={0} />
              <ThemeOption title="Dark" icon="moon-waning-crescent" value="dark" index={1} />
              <ThemeOption title="System" icon="theme-light-dark" value="system" index={2} />
            </AnimatedSurface>
          )}
        </List.Section>

        {/* Account Management */}
        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <List.Subheader style={{ color: theme.colors.onSurfaceVariant }}>Account</List.Subheader>
            <List.Item
              title="Edit Profile"
              description="Update your profile information"
              left={props => <List.Icon {...props} icon="account-edit" />}
              onPress={() => router.push({ pathname: "/settings/profile" })}
            />
            <List.Item
              title="Change Password"
              description="Update your password"
              left={props => <List.Icon {...props} icon="key" />}
              onPress={() => router.push({ pathname: "/settings/password" })}
            />
            <List.Item
              title="Help & Support"
              description="Get help or contact support"
              left={props => <List.Icon {...props} icon="help-circle" />}
              onPress={() => router.push({ pathname: "/support" })}
            />
            <List.Item
              title="Sign Out"
              description="Log out of your account"
              left={props => <List.Icon {...props} icon="logout" color={theme.colors.error} />}
              onPress={signOut}
              titleStyle={{ color: theme.colors.error }}
            />
          </Animated.View>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}