import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, FAB } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommunityCard } from '@/components/CommunityCard';
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
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);

  const handleJoinCommunity = (id: string) => {
    setJoinedCommunities(prev => [...prev, id]);
    // TODO: Implement actual join API call
  };

  const handleLeaveCommunity = (id: string) => {
    setJoinedCommunities(prev => prev.filter(communityId => communityId !== id));
    // TODO: Implement actual leave API call
  };

  // Add this helper function to get faculty name
  const getFacultyName = (facultyId: string): string => {
    const faculty = mockDepartments.flatMap(d => d.faculty).find(f => f.id === facultyId);
    return faculty?.name || 'Faculty Member';
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={{ padding: spacing.md }}>
          <Text variant="headlineMedium" style={{ marginBottom: spacing.md }}>Community Hub</Text>

          {/* Department Forums */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Department Forums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockDepartments.map(dept => (
              <CommunityCard
                key={dept.id}
                id={dept.id}
                title={dept.name}
                description={dept.description}
                memberCount={dept.faculty.length + dept.students.length}
                isJoined={joinedCommunities.includes(dept.id)}
                onJoin={handleJoinCommunity}
                onLeave={handleLeaveCommunity}
              />
            ))}
          </ScrollView>

          {/* Research Collaborations */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Research Opportunities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockResearchCollaborations.map(collab => (
              <CommunityCard
                key={collab.id}
                id={collab.id}
                title={collab.title}
                description={collab.description}
                tags={collab.tags}
                memberCount={collab.members.length}
                isJoined={joinedCommunities.includes(collab.id)}
                onJoin={handleJoinCommunity}
                onLeave={handleLeaveCommunity}
                width={300}
              />
            ))}
          </ScrollView>

          {/* Mentorship */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Mentorship Program</Text>
          <CommunityCard
            id="mentorship"
            title={mockMentorshipProgram.name}
            description={mockMentorshipProgram.description}
            memberCount={mockMentorshipProgram.mentors.length + mockMentorshipProgram.mentees.length}
            tags={['Mentorship', 'Career Development']}
            isJoined={joinedCommunities.includes('mentorship')}
            onJoin={handleJoinCommunity}
            onLeave={handleLeaveCommunity}
            showPreview={false}
          />

          {/* Office Hours */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Faculty Office Hours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockOfficeHours.map(slot => (
              <CommunityCard
                key={slot.id}
                id={slot.id}
                title={`${getFacultyName(slot.facultyId)}'s Office Hours`}
                description={`${new Date(slot.date).toLocaleDateString()} • ${slot.startTime}-${slot.endTime}\n${slot.location}`}
                memberCount={slot.bookedBy.length}
                tags={['Office Hours']}
                isJoined={joinedCommunities.includes(slot.id)}
                onJoin={handleJoinCommunity}
                onLeave={handleLeaveCommunity}
              />
            ))}
          </ScrollView>

          {/* Alumni Network */}
          <Text variant="titleLarge" style={{ marginBottom: spacing.sm }}>Alumni Network</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
            {mockAlumniNetwork.map(alumni => (
              <CommunityCard
                key={alumni.id}
                id={alumni.id}
                title={alumni.name}
                description={`${alumni.currentPosition.title} at ${alumni.currentPosition.company}`}
                tags={alumni.expertise}
                isJoined={joinedCommunities.includes(alumni.id)}
                onJoin={handleJoinCommunity}
                onLeave={handleLeaveCommunity}
                width={300}
              />
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