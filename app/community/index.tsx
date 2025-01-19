import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, Card, Chip, IconButton, FAB } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  mockDepartmentForums,
  mockOfficeHours,
  mockMentorshipProgram,
  mockResearchCollaborations,
  mockAlumniNetwork,
  mockDepartments
} from '@/data/mockUniversityData';

export default function CommunityScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={{ padding: spacing.md }}>
          <Text variant="headlineMedium" style={{ marginBottom: spacing.md }}>Community Hub</Text>

          {/* Department Forums */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Department Forums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockDepartments.map(dept => (
              <Card
                key={dept.id}
                style={{ width: 200, marginRight: spacing.md }}
                onPress={() => router.push({
                  pathname: "/community/[id]" as const,
                  params: { id: dept.id }
                })}
              >
                <Card.Content>
                  <Text variant="titleMedium">{dept.name}</Text>
                  <Text variant="bodySmall" numberOfLines={2}>{dept.description}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>

          {/* Research Collaborations */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Research Opportunities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockResearchCollaborations.map(collab => (
              <Card
                key={collab.id}
                style={{ width: 250, marginRight: spacing.md }}
                onPress={() => router.push({
                  pathname: "/community/[id]" as const,
                  params: { id: collab.id }
                })}
              >
                <Card.Content>
                  <Text variant="titleMedium">{collab.title}</Text>
                  <Text variant="bodySmall" numberOfLines={2}>{collab.description}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs }}>
                    {collab.tags.map(tag => (
                      <Chip key={tag} style={{ marginRight: spacing.xs, marginTop: spacing.xs }}>{tag}</Chip>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>

          {/* Mentorship */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Mentorship Program</Text>
          <Card
            style={{ marginBottom: spacing.lg }}
            onPress={() => router.push("/community/mentorship")}
          >
            <Card.Content>
              <Text variant="titleMedium">{mockMentorshipProgram.name}</Text>
              <Text variant="bodySmall">{mockMentorshipProgram.description}</Text>
              <View style={{ flexDirection: 'row', marginTop: spacing.sm }}>
                <Chip icon="account-supervisor" style={{ marginRight: spacing.xs }}>
                  {mockMentorshipProgram.mentors.length} Mentors
                </Chip>
                <Chip icon="account-school" style={{ marginRight: spacing.xs }}>
                  {mockMentorshipProgram.mentees.length} Mentees
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Office Hours */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Faculty Office Hours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockOfficeHours.map(slot => (
              <Card
                key={slot.id}
                style={{ width: 200, marginRight: spacing.md }}
                onPress={() => router.push({
                  pathname: "/community/[id]" as const,
                  params: { id: slot.id }
                })}
              >
                <Card.Content>
                  <Text variant="titleMedium">
                    {new Date(slot.date).toLocaleDateString()} • {slot.startTime}-{slot.endTime}
                  </Text>
                  <Text variant="bodySmall">{slot.location}</Text>
                  <Chip icon="account-group" style={{ marginTop: spacing.xs }}>
                    {slot.maxStudents - slot.bookedBy.length} spots left
                  </Chip>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>

          {/* Alumni Network */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Alumni Network</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockAlumniNetwork.map(alumni => (
              <Card
                key={alumni.id}
                style={{ width: 250, marginRight: spacing.md }}
                onPress={() => router.push({
                  pathname: "/community/[id]" as const,
                  params: { id: alumni.id }
                })}
              >
                <Card.Content>
                  <Text variant="titleMedium">{alumni.name}</Text>
                  <Text variant="bodySmall">
                    {alumni.currentPosition.title} at {alumni.currentPosition.company}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs }}>
                    {alumni.expertise.map(exp => (
                      <Chip key={exp} style={{ marginRight: spacing.xs, marginTop: spacing.xs }}>{exp}</Chip>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        label="Create Post"
        style={{
          position: 'absolute',
          margin: spacing.lg,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => router.push("/community/create")}
      />
    </SafeAreaView>
  );
} 