import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, Card, Chip, Button, List, Avatar, Divider } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  mockDepartments,
  mockResearchCollaborations,
  mockOfficeHours,
  mockAlumniNetwork,
  mockDepartmentForums
} from '@/data/mockUniversityData';

export default function CommunityDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [content, setContent] = useState<any>(null);
  const [contentType, setContentType] = useState<string>('');

  useEffect(() => {
    // Find the content based on the ID
    const department = mockDepartments.find(d => d.id === id);
    const research = mockResearchCollaborations.find(r => r.id === id);
    const officeHour = mockOfficeHours.find(o => o.id === id);
    const alumni = mockAlumniNetwork.find(a => a.id === id);
    const forum = mockDepartmentForums.find(f => f.id === id);

    if (department) {
      setContent(department);
      setContentType('department');
    } else if (research) {
      setContent(research);
      setContentType('research');
    } else if (officeHour) {
      setContent(officeHour);
      setContentType('officeHours');
    } else if (alumni) {
      setContent(alumni);
      setContentType('alumni');
    } else if (forum) {
      setContent(forum);
      setContentType('forum');
    }
  }, [id]);

  if (!content) {
    return (
      <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
        <View style={{ padding: spacing.md }}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderDepartmentContent = () => (
    <>
      <Text variant="headlineMedium">{content.name}</Text>
      <Text variant="bodyLarge" style={{ marginTop: spacing.sm }}>{content.description}</Text>
      <Divider style={{ marginVertical: spacing.md }} />
      
      <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Faculty</Text>
      {content.faculty.map((faculty: any) => (
        <List.Item
          key={faculty.id}
          title={faculty.name}
          description={faculty.position}
          left={props => <Avatar.Text {...props} label={faculty.name.split(' ').map((n: string) => n[0]).join('')} />}
        />
      ))}
    </>
  );

  const renderResearchContent = () => (
    <>
      <Text variant="headlineMedium">{content.title}</Text>
      <Text variant="bodyLarge" style={{ marginTop: spacing.sm }}>{content.description}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm }}>
        {content.tags.map((tag: string) => (
          <Chip key={tag} style={{ marginRight: spacing.xs, marginTop: spacing.xs }}>{tag}</Chip>
        ))}
      </View>
      <Divider style={{ marginVertical: spacing.md }} />
      
      <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Team Members</Text>
      {content.members.map((member: any) => (
        <List.Item
          key={member.id}
          title={member.name}
          description={member.role}
          left={props => <Avatar.Text {...props} label={member.name.split(' ').map((n: string) => n[0]).join('')} />}
        />
      ))}
    </>
  );

  const renderOfficeHoursContent = () => (
    <>
      <Text variant="headlineMedium">Office Hours</Text>
      <Card style={{ marginTop: spacing.md }}>
        <Card.Content>
          <Text variant="titleLarge">{content.faculty.name}</Text>
          <Text variant="bodyLarge">{content.faculty.department}</Text>
          <Divider style={{ marginVertical: spacing.sm }} />
          <Text variant="titleMedium">
            {new Date(content.date).toLocaleDateString()} • {content.startTime}-{content.endTime}
          </Text>
          <Text variant="bodyMedium">Location: {content.location}</Text>
          <Text variant="bodyMedium">
            Available Spots: {content.maxStudents - content.bookedBy.length}/{content.maxStudents}
          </Text>
          <Button
            mode="contained"
            onPress={() => {/* TODO: Implement booking */}}
            style={{ marginTop: spacing.md }}
            disabled={content.bookedBy.length >= content.maxStudents}
          >
            Book Slot
          </Button>
        </Card.Content>
      </Card>
    </>
  );

  const renderAlumniContent = () => (
    <>
      <Text variant="headlineMedium">{content.name}</Text>
      <Text variant="titleLarge" style={{ marginTop: spacing.sm }}>
        {content.currentPosition.title} at {content.currentPosition.company}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm }}>
        {content.expertise.map((exp: string) => (
          <Chip key={exp} style={{ marginRight: spacing.xs, marginTop: spacing.xs }}>{exp}</Chip>
        ))}
      </View>
      <Divider style={{ marginVertical: spacing.md }} />
      
      <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Experience</Text>
      {content.experience.map((exp: any) => (
        <List.Item
          key={exp.id}
          title={`${exp.title} at ${exp.company}`}
          description={`${exp.startDate} - ${exp.endDate}`}
        />
      ))}
    </>
  );

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={{ padding: spacing.md }}>
          {contentType === 'department' && renderDepartmentContent()}
          {contentType === 'research' && renderResearchContent()}
          {contentType === 'officeHours' && renderOfficeHoursContent()}
          {contentType === 'alumni' && renderAlumniContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 