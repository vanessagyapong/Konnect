import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, Searchbar, Surface, Avatar, Button, Chip, TouchableRipple, SegmentedButtons } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock data for communities
const mockCommunities = [
  {
    id: 'cs101',
    name: 'Computer Science',
    avatar: 'CS',
    description: 'A community for computer science students and professionals to discuss various topics in the field.',
    memberCount: 2500,
    tags: ['Programming', 'AI', 'Web Dev', 'Mobile Dev'],
    subCommunitiesCount: 2,
    suggested: true
  },
  {
    id: 'math101',
    name: 'Mathematics',
    avatar: 'MT',
    description: 'A community dedicated to mathematical concepts, problem-solving, and theoretical discussions.',
    memberCount: 1900,
    tags: ['Calculus', 'Linear Algebra', 'Statistics', 'Number Theory'],
    subCommunitiesCount: 2,
    suggested: true
  },
  {
    id: 'eng201',
    name: 'Engineering',
    avatar: 'ENG',
    description: 'A hub for engineering students to collaborate and share knowledge across different disciplines.',
    memberCount: 1800,
    tags: ['Mechanical', 'Electrical', 'Civil', 'Chemical'],
    subCommunitiesCount: 2,
    suggested: false
  },
  {
    id: 'bio101',
    name: 'Biosciences',
    avatar: 'BIO',
    description: 'Community for biology and life sciences students to discuss research and developments.',
    memberCount: 1500,
    tags: ['Genetics', 'Biotechnology', 'Microbiology', 'Research'],
    subCommunitiesCount: 2,
    suggested: true
  },
  {
    id: 'chem101',
    name: 'Chemistry',
    avatar: 'CH',
    description: 'A community for chemistry enthusiasts to discuss chemical principles, research, and applications.',
    memberCount: 1400,
    tags: ['Organic Chemistry', 'Physical Chemistry', 'Biochemistry', 'Analytical'],
    subCommunitiesCount: 2,
    suggested: false
  }
];

type FilterValue = 'joined' | 'suggested' | 'browse';

export default function CommunitiesScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { filter: initialFilter } = useLocalSearchParams<{ filter?: FilterValue }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterValue>(initialFilter || 'browse');

  // Update filter when navigation params change
  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter);
    }
  }, [initialFilter]);

  const handleJoin = (communityId: string, event: any) => {
    event.stopPropagation(); // Prevent triggering the card's onPress
    setJoinedCommunities(prev =>
      prev.includes(communityId)
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId]
    );
  };

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    switch (filter) {
      case 'joined':
        return matchesSearch && joinedCommunities.includes(community.id);
      case 'suggested':
        return matchesSearch && community.suggested && !joinedCommunities.includes(community.id);
      case 'browse':
      default:
        return matchesSearch;
    }
  });

  const renderCommunityCard = (community: typeof mockCommunities[0]) => (
    <Surface
      key={community.id}
      style={{
        marginBottom: spacing.md,
        borderRadius: theme.roundness,
        overflow: 'hidden',
      }}
    >
      <TouchableRipple
        onPress={() => router.push({
          pathname: "/community/[id]",
          params: { id: community.id }
        })}
      >
        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            <Avatar.Text
              size={48}
              label={community.avatar}
              style={{ marginRight: spacing.md }}
            />
            <View style={{ flex: 1 }}>
              <TouchableRipple
                onPress={() => router.push({
                  pathname: "/community/[id]",
                  params: { id: community.id }
                })}
              >
                <Text 
                  variant="titleLarge" 
                  style={{ 
                    color: theme.colors.primary,
                    marginBottom: spacing.xs 
                  }}
                >
                  {community.name}
                </Text>
              </TouchableRipple>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {community.memberCount.toLocaleString()} members
                </Text>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {' • '}{community.subCommunitiesCount} sub-communities
                </Text>
                {community.suggested && filter === 'suggested' && (
                  <Chip 
                    mode="flat" 
                    compact 
                    style={{ 
                      marginLeft: spacing.xs,
                      backgroundColor: theme.colors.primaryContainer,
                    }}
                  >
                    Suggested
                  </Chip>
                )}
              </View>
            </View>
            <Button
              mode={joinedCommunities.includes(community.id) ? "outlined" : "contained"}
              onPress={(e) => handleJoin(community.id, e)}
            >
              {joinedCommunities.includes(community.id) ? 'Leave' : 'Join'}
            </Button>
          </View>

          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: spacing.sm,
            }}
            numberOfLines={2}
          >
            {community.description}
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
            {community.tags.map(tag => (
              <Chip
                key={tag}
                compact
                style={{ marginBottom: spacing.xs }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );

  const renderEmptyState = () => (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingVertical: spacing.xl,
    }}>
      <Text 
        variant="titleMedium" 
        style={{ 
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginBottom: spacing.sm,
        }}
      >
        {filter === 'joined' 
          ? "You haven't joined any communities yet" 
          : filter === 'suggested'
          ? "No suggested communities found"
          : "No communities found"}
      </Text>
      <Text 
        variant="bodyMedium" 
        style={{ 
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginBottom: spacing.lg,
        }}
      >
        {filter === 'joined' 
          ? "Join some communities to see them here"
          : filter === 'suggested'
          ? "Try browsing all communities instead"
          : "Try adjusting your search"}
      </Text>
      {filter !== 'browse' && (
        <Button 
          mode="contained"
          onPress={() => setFilter('browse')}
        >
          Browse All Communities
        </Button>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={{ padding: spacing.md }}>
        <Text variant="headlineMedium" style={{ marginBottom: spacing.md }}>Communities</Text>
        <Searchbar
          placeholder="Search communities..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            marginBottom: spacing.md,
            backgroundColor: theme.colors.surfaceVariant,
          }}
        />
        <SegmentedButtons
          value={filter}
          onValueChange={value => setFilter(value as FilterValue)}
          buttons={[
            { value: 'joined', label: 'Joined' },
            { value: 'suggested', label: 'Suggested' },
            { value: 'browse', label: 'Browse' },
          ]}
          style={{ marginBottom: spacing.md }}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: spacing.md }}>
          {filteredCommunities.length > 0 
            ? filteredCommunities.map(renderCommunityCard)
            : renderEmptyState()
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 