import { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text, Surface, List, IconButton, Menu, Divider } from 'react-native-paper';
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
import { mockAcademicProfile, mockStudyGroups } from '@/data/mockUniversityData';

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
  const { theme, themeMode: themeType, setThemeMode: setTheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showCommunities, setShowCommunities] = useState(false);
  const [showAcademic, setShowAcademic] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const scrollY = useSharedValue(0);
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

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Animated.View style={[sharedStyles.header, headerStyle]}>
          <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
            <IconButton
              icon="account-circle"
              size={80}
              style={{ margin: 0 }}
            />
            <Text variant="headlineSmall" style={{ marginTop: spacing.sm }}>
              {user?.email || 'User Email'}
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              {mockAcademicProfile.major} • Year {mockAcademicProfile.year}
            </Text>
          </View>
        </Animated.View>

        <List.Section>
          <Animated.View entering={FadeInDown.duration(500)}>
            <List.Accordion
              title="Academic Information"
              left={props => <List.Icon {...props} icon="school" />}
              expanded={showAcademic}
              onPress={() => setShowAcademic(!showAcademic)}
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
                description={`${mockAcademicProfile.advisor.name}\n${mockAcademicProfile.advisor.email}`}
                left={props => <List.Icon {...props} icon="account-tie" />}
                onPress={() => console.log('Contact advisor')}
              />
              <List.Item
                title="Credits Completed"
                description={`${mockAcademicProfile.credits} credits`}
                left={props => <List.Icon {...props} icon="certificate" />}
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

        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <List.Accordion
              title="Current Courses"
              left={props => <List.Icon {...props} icon="notebook" />}
              expanded={showCourses}
              onPress={() => setShowCourses(!showCourses)}
            >
              {mockAcademicProfile.courses.current.map(course => (
                <List.Item
                  key={course.id}
                  title={course.name}
                  description={`${course.code} • ${course.professor}`}
                  left={props => <List.Icon {...props} icon="book-education" />}
                  onPress={() => router.push({
                    pathname: "/community/[id]" as const,
                    params: { id: course.id }
                  })}
                />
              ))}
            </List.Accordion>
          </Animated.View>
        </List.Section>

        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <List.Accordion
              title="Study Groups"
              left={props => <List.Icon {...props} icon="account-group" />}
              expanded={showCommunities}
              onPress={() => setShowCommunities(!showCommunities)}
            >
              {mockStudyGroups.map(group => (
                <List.Item
                  key={group.id}
                  title={group.name}
                  description={`${group.members.length} members`}
                  left={props => <List.Icon {...props} icon="account-multiple" />}
                  onPress={() => router.push({
                    pathname: "/community/[id]" as const,
                    params: { id: group.id }
                  })}
                />
              ))}
            </List.Accordion>
          </Animated.View>
        </List.Section>

        <Divider />

        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <List.Subheader style={{ color: theme.colors.onSurfaceVariant }}>Preferences</List.Subheader>
          </Animated.View>
          <AnimatedSurface 
            entering={FadeInDown.duration(500).delay(400)}
            style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
          >
            <TouchableOpacity
              onPress={toggleMenu}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: theme.roundness,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.onSurface, fontSize: 16 }}>Theme</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, marginTop: 4 }}>
                  {themeType.charAt(0).toUpperCase() + themeType.slice(1)}
                </Text>
              </View>
              <Animated.View style={[{ transform: [{ rotate: `${rotation.value}deg` }] }]}>
                <MaterialCommunityIcons 
                  name="chevron-down"
                  size={24} 
                  color={theme.colors.onSurfaceVariant} 
                />
              </Animated.View>
            </TouchableOpacity>

            {menuVisible && (
              <Animated.View
                entering={FadeInDown.springify()}
                exiting={FadeOut.duration(200)}
                layout={Layout.springify()}
              >
                <ThemeOption title="Light" icon="white-balance-sunny" value="light" index={0} />
                <ThemeOption title="Dark" icon="moon-waning-crescent" value="dark" index={1} />
                <ThemeOption title="System" icon="theme-light-dark" value="system" index={2} />
              </Animated.View>
            )}
          </AnimatedSurface>
        </List.Section>

        <List.Section>
          <Animated.View entering={FadeInDown.duration(500).delay(500)}>
            <List.Item
              title="Sign Out"
              left={props => <List.Icon {...props} icon="logout" />}
              onPress={signOut}
              titleStyle={{ color: theme.colors.error }}
            />
          </Animated.View>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}