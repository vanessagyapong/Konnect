import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, IconButton, Card, List, FAB, Chip } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mockCourses, mockStudyGroups } from '@/data/mockUniversityData';

export default function CourseScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  const studyGroups = mockStudyGroups.filter(group => group.courseId === id);

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => router.back()}
          />
          <Text variant="headlineMedium" style={{ flex: 1 }}>{course.name}</Text>
        </View>

        <Card style={{ marginBottom: spacing.md }}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <MaterialCommunityIcons
                name="book-education"
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: spacing.sm }}
              />
              <Text variant="titleMedium">{course.code}</Text>
            </View>
            <Text variant="bodyMedium">{course.description}</Text>
            
            <View style={{ marginTop: spacing.md }}>
              <Text variant="titleSmall" style={{ marginBottom: spacing.sm }}>Schedule</Text>
              {course.schedule.map((session, index) => (
                <Chip
                  key={index}
                  style={{ marginBottom: spacing.xs }}
                  icon="clock"
                >
                  {session.day} • {session.time} • {session.location}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <List.Section>
          <List.Accordion
            title="Course Announcements"
            left={props => <List.Icon {...props} icon="bullhorn" />}
            expanded={showAnnouncements}
            onPress={() => setShowAnnouncements(!showAnnouncements)}
          >
            <List.Item
              title="Midterm Date Announced"
              description="The midterm will be held on April 15th"
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item
              title="Assignment 2 Posted"
              description="Due date: March 30th"
              left={props => <List.Icon {...props} icon="file-document" />}
            />
          </List.Accordion>

          <List.Accordion
            title="Course Resources"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={showResources}
            onPress={() => setShowResources(!showResources)}
          >
            <List.Item
              title="Syllabus"
              description="Course outline and requirements"
              left={props => <List.Icon {...props} icon="file-pdf-box" />}
            />
            <List.Item
              title="Lecture Notes"
              description="Week 1-5 lecture slides"
              left={props => <List.Icon {...props} icon="presentation" />}
            />
          </List.Accordion>
        </List.Section>

        <Text variant="titleMedium" style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
          Study Groups
        </Text>
        <ScrollView>
          {studyGroups.map(group => (
            <Card key={group.id} style={{ marginBottom: spacing.sm }}>
              <Card.Title
                title={group.name}
                subtitle={`${group.members.length} members`}
                left={props => <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.primary} />}
              />
            </Card>
          ))}
        </ScrollView>
      </View>

      <FAB
        icon="plus"
        label="Join Study Group"
        style={{
          position: 'absolute',
          margin: spacing.lg,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => console.log('Create study group')}
      />
    </SafeAreaView>
  );
} 