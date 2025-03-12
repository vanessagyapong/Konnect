import React, { useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, IconButton, Button, Avatar, Chip, Surface, TouchableRipple, Divider, FAB } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data for all communities
const mockCommunityData = {
  cs101: {
    id: 'cs101',
    name: 'Computer Science',
    avatar: 'CS',
    description: 'A community for computer science students and professionals to discuss various topics in the field.',
    memberCount: 2500,
    subCommunities: [
      {
        id: 'ai',
        name: 'Artificial Intelligence',
        description: 'Discussions about AI, Machine Learning, and Deep Learning',
        memberCount: 850,
        topics: [
          {
            id: 'ai1',
            title: 'Latest Developments in AI and Machine Learning',
            author: { name: 'John Doe', avatar: 'JD' },
            preview: 'Discussing the recent breakthroughs in AI technology...',
            stats: { likes: 156, comments: 45, timeAgo: '2 days ago' }
          },
          {
            id: 'ai2',
            title: 'Ethics in AI Development',
            author: { name: 'Sarah Chen', avatar: 'SC' },
            preview: 'Important considerations for ethical AI development...',
            stats: { likes: 132, comments: 38, timeAgo: '1 day ago' }
          }
        ]
      },
      {
        id: 'webdev',
        name: 'Web Development',
        description: 'Modern web development technologies and practices',
        memberCount: 720,
        topics: [
          {
            id: 'web1',
            title: 'React vs Vue in 2024',
            author: { name: 'Mike Wilson', avatar: 'MW' },
            preview: 'Comparing modern frontend frameworks...',
            stats: { likes: 98, comments: 72, timeAgo: '3 days ago' }
          }
        ]
      }
    ]
  },
  math101: {
    id: 'math101',
    name: 'Mathematics',
    avatar: 'MT',
    description: 'A community dedicated to mathematical concepts, problem-solving, and theoretical discussions.',
    memberCount: 1900,
    subCommunities: [
      {
        id: 'calculus',
        name: 'Calculus',
        description: 'Advanced calculus concepts and applications',
        memberCount: 580,
        topics: [
          {
            id: 'calc1',
            title: 'Understanding Complex Integration',
            author: { name: 'Alan Smith', avatar: 'AS' },
            preview: 'Deep dive into complex integration techniques...',
            stats: { likes: 145, comments: 52, timeAgo: '1 day ago' }
          },
          {
            id: 'calc2',
            title: 'Applications of Differential Equations',
            author: { name: 'Mary Johnson', avatar: 'MJ' },
            preview: 'Real-world applications of differential equations...',
            stats: { likes: 128, comments: 43, timeAgo: '2 days ago' }
          }
        ]
      },
      {
        id: 'algebra',
        name: 'Linear Algebra',
        description: 'Discussions on linear algebra and its applications',
        memberCount: 420,
        topics: [
          {
            id: 'alg1',
            title: 'Matrix Operations in Machine Learning',
            author: { name: 'Peter Chang', avatar: 'PC' },
            preview: 'How linear algebra powers ML algorithms...',
            stats: { likes: 167, comments: 58, timeAgo: '1 day ago' }
          }
        ]
      }
    ]
  },
  eng201: {
    id: 'eng201',
    name: 'Engineering',
    avatar: 'ENG',
    description: 'A hub for engineering students to collaborate and share knowledge across different disciplines.',
    memberCount: 1800,
    subCommunities: [
      {
        id: 'mech',
        name: 'Mechanical Engineering',
        description: 'Discussion forum for mechanical engineering topics',
        memberCount: 450,
        topics: [
          {
            id: 'mech1',
            title: 'Sustainable Manufacturing Techniques',
            author: { name: 'Robert Lee', avatar: 'RL' },
            preview: 'Exploring eco-friendly manufacturing processes...',
            stats: { likes: 89, comments: 32, timeAgo: '1 day ago' }
          },
          {
            id: 'mech2',
            title: 'Advanced CAD Design Principles',
            author: { name: 'Jennifer Park', avatar: 'JP' },
            preview: 'Best practices for complex CAD modeling...',
            stats: { likes: 76, comments: 28, timeAgo: '2 days ago' }
          }
        ]
      },
      {
        id: 'elec',
        name: 'Electrical Engineering',
        description: 'Topics related to electrical and electronic engineering',
        memberCount: 380,
        topics: [
          {
            id: 'elec1',
            title: 'Renewable Energy Systems',
            author: { name: 'Lisa Wang', avatar: 'LW' },
            preview: 'Latest developments in renewable energy...',
            stats: { likes: 112, comments: 45, timeAgo: '3 days ago' }
          },
          {
            id: 'elec2',
            title: 'PCB Design Optimization',
            author: { name: 'Tom Brown', avatar: 'TB' },
            preview: 'Tips for efficient PCB layout and routing...',
            stats: { likes: 95, comments: 41, timeAgo: '1 day ago' }
          }
        ]
      }
    ]
  },
  bio101: {
    id: 'bio101',
    name: 'Biosciences',
    avatar: 'BIO',
    description: 'Community for biology and life sciences students to discuss research and developments.',
    memberCount: 1500,
    subCommunities: [
      {
        id: 'genetics',
        name: 'Genetics',
        description: 'Discussions about genetic research and applications',
        memberCount: 320,
        topics: [
          {
            id: 'gen1',
            title: 'CRISPR Technology Advances',
            author: { name: 'David Kim', avatar: 'DK' },
            preview: 'Recent breakthroughs in gene editing...',
            stats: { likes: 167, comments: 58, timeAgo: '2 days ago' }
          },
          {
            id: 'gen2',
            title: 'Epigenetics Research',
            author: { name: 'Rachel Chen', avatar: 'RC' },
            preview: 'Understanding gene expression regulation...',
            stats: { likes: 142, comments: 49, timeAgo: '1 day ago' }
          }
        ]
      },
      {
        id: 'biotech',
        name: 'Biotechnology',
        description: 'Forum for biotechnology innovations and research',
        memberCount: 280,
        topics: [
          {
            id: 'biotech1',
            title: 'Vaccine Development Technologies',
            author: { name: 'Maria Garcia', avatar: 'MG' },
            preview: 'Modern approaches to vaccine development...',
            stats: { likes: 143, comments: 51, timeAgo: '1 day ago' }
          }
        ]
      }
    ]
  },
  chem101: {
    id: 'chem101',
    name: 'Chemistry',
    avatar: 'CH',
    description: 'A community for chemistry enthusiasts to discuss chemical principles, research, and applications.',
    memberCount: 1400,
    subCommunities: [
      {
        id: 'orgchem',
        name: 'Organic Chemistry',
        description: 'Discussions about organic compounds and reactions',
        memberCount: 420,
        topics: [
          {
            id: 'org1',
            title: 'Novel Synthesis Methods',
            author: { name: 'Chris Taylor', avatar: 'CT' },
            preview: 'Innovative approaches to organic synthesis...',
            stats: { likes: 134, comments: 48, timeAgo: '2 days ago' }
          }
        ]
      },
      {
        id: 'physchem',
        name: 'Physical Chemistry',
        description: 'Topics in thermodynamics and quantum chemistry',
        memberCount: 380,
        topics: [
          {
            id: 'phys1',
            title: 'Quantum Mechanics in Chemistry',
            author: { name: 'Diana Lee', avatar: 'DL' },
            preview: 'Understanding molecular orbital theory...',
            stats: { likes: 156, comments: 62, timeAgo: '1 day ago' }
          }
        ]
      }
    ]
  }
};

export default function CommunityDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isJoined, setIsJoined] = useState(false);
  
  const community = mockCommunityData[id as keyof typeof mockCommunityData];

  if (!community) {
    return (
      <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
        <View style={{ padding: spacing.md }}>
          <Text variant="headlineMedium">Community not found</Text>
          <Button mode="contained" onPress={() => router.push("/")} style={{ marginTop: spacing.md }}>
            Go to Home
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const handleJoin = () => {
    setIsJoined(!isJoined);
  };

  const renderHeader = () => (
    <View style={{ padding: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.push("/")}
        />
        <Avatar.Text 
          size={40} 
          label={community.avatar}
          style={{ marginRight: spacing.md }}
        />
        <View style={{ flex: 1 }}>
          <Text variant="headlineSmall">{community.name}</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {community.memberCount.toLocaleString()} members
          </Text>
        </View>
        <Button
          mode={isJoined ? "outlined" : "contained"}
          onPress={handleJoin}
        >
          {isJoined ? 'Leave' : 'Join'}
        </Button>
      </View>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
        {community.description}
      </Text>
    </View>
  );

  const renderSubCommunity = (subCommunity: typeof community.subCommunities[0]) => (
    <Surface 
      key={subCommunity.id}
      style={{ 
        marginBottom: spacing.md,
        borderRadius: theme.roundness,
        overflow: 'hidden',
      }}
    >
      <View style={{ padding: spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
          <Text variant="titleMedium" style={{ flex: 1 }}>{subCommunity.name}</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {subCommunity.memberCount} members
          </Text>
        </View>
        <Text 
          variant="bodyMedium" 
          style={{ 
            color: theme.colors.onSurfaceVariant,
            marginBottom: spacing.sm,
          }}
        >
          {subCommunity.description}
        </Text>
        
        {subCommunity.topics.map(topic => (
          <TouchableRipple
            key={topic.id}
            onPress={() => router.push({
              pathname: "/community/[id]/post/[postId]",
              params: { id: community.id, postId: topic.id }
            })}
          >
            <View style={{ 
              padding: spacing.sm,
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: theme.roundness,
              marginBottom: spacing.xs,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                <Avatar.Text size={24} label={topic.author.avatar} />
                <Text variant="labelMedium" style={{ marginLeft: spacing.xs }}>
                  {topic.author.name}
                </Text>
                <Text 
                  variant="bodySmall" 
                  style={{ 
                    marginLeft: spacing.xs,
                    color: theme.colors.onSurfaceVariant,
                  }}
                >
                  • {topic.stats.timeAgo}
                </Text>
              </View>
              <Text variant="titleSmall" style={{ marginBottom: spacing.xs }}>
                {topic.title}
              </Text>
              <Text 
                variant="bodySmall" 
                numberOfLines={2}
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {topic.preview}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: spacing.xs }}>
                <Button
                  mode="text"
                  icon="heart-outline"
                  compact
                >
                  {topic.stats.likes}
                </Button>
                <Button
                  mode="text"
                  icon="comment-outline"
                  compact
                >
                  {topic.stats.comments}
                </Button>
              </View>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {renderHeader()}
      <Divider />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: spacing.md }}>
          {community.subCommunities.map(renderSubCommunity)}
        </View>
      </ScrollView>
      
      <FAB
        icon="plus"
        label="Create Post"
        style={{
          position: 'absolute',
          margin: spacing.lg,
          right: 0,
          bottom: 70, // Added extra bottom margin to account for tab bar
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => router.push("/community/create")}
      />
    </SafeAreaView>
  );
} 