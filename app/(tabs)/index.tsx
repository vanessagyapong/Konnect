import { useState } from 'react';
import { View, Platform, Image, ScrollView } from 'react-native';
import { 
  Text, 
  Searchbar, 
  IconButton, 
  Avatar, 
  Chip, 
  Button, 
  FAB,
  Portal,
  Surface,
  TouchableRipple,
  Divider,
  Snackbar,
  Modal,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Mock data for trending discussions
const trendingFromJoined = [
  {
    id: '1',
    community: {
      id: 'cs101',
      name: 'Computer Science',
      avatar: 'CS'
    },
    title: 'Latest Developments in AI and Machine Learning',
    content: 'Discussing the recent breakthroughs in AI technology and their implications for future development...',
    image: 'https://picsum.photos/seed/ai1/400/200',
    likes: 156,
    comments: 45,
    postedAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    community: {
      id: 'eng201',
      name: 'Engineering Hub',
      avatar: 'EH'
    },
    title: 'Sustainable Engineering Projects Showcase',
    content: 'Check out these innovative sustainable engineering projects from our department...',
    image: 'https://picsum.photos/seed/eng2/400/200',
    likes: 132,
    comments: 28,
    postedAt: new Date('2024-03-09'),
  },
  {
    id: '3',
    community: {
      id: 'bio101',
      name: 'Bioscience',
      avatar: 'BS'
    },
    title: 'New Research in Genetic Engineering',
    content: 'Exploring the latest discoveries in genetic engineering and their potential applications...',
    image: 'https://picsum.photos/seed/bio3/400/200',
    likes: 98,
    comments: 34,
    postedAt: new Date('2024-03-08'),
  },
  {
    id: '4',
    community: {
      id: 'math201',
      name: 'Mathematics',
      avatar: 'MT'
    },
    title: 'Understanding Complex Number Theory',
    content: 'A comprehensive guide to understanding complex number theory and its applications...',
    image: 'https://picsum.photos/seed/math4/400/200',
    likes: 87,
    comments: 42,
    postedAt: new Date('2024-03-07'),
  },
  {
    id: '5',
    community: {
      id: 'phy101',
      name: 'Physics Lab',
      avatar: 'PL'
    },
    title: 'Quantum Computing Breakthroughs',
    content: 'Recent advancements in quantum computing and their implications for future technology...',
    image: 'https://picsum.photos/seed/phy5/400/200',
    likes: 145,
    comments: 38,
    postedAt: new Date('2024-03-06'),
  },
];

const trendingFromSuggested = [
  {
    id: '6',
    community: {
      id: 'art101',
      name: 'Digital Arts',
      avatar: 'DA'
    },
    title: 'Digital Art Exhibition 2024',
    content: 'Showcasing the best digital artworks from our talented students...',
    image: 'https://picsum.photos/seed/art6/400/200',
    likes: 178,
    comments: 52,
    postedAt: new Date('2024-03-10'),
  },
  {
    id: '7',
    community: {
      id: 'chem201',
      name: 'Chemistry Lab',
      avatar: 'CL'
    },
    title: 'Innovative Chemical Synthesis Methods',
    content: 'New approaches to chemical synthesis that are revolutionizing the field...',
    image: 'https://picsum.photos/seed/chem7/400/200',
    likes: 92,
    comments: 31,
    postedAt: new Date('2024-03-09'),
  },
  {
    id: '8',
    community: {
      id: 'eco101',
      name: 'Economics',
      avatar: 'EC'
    },
    title: 'Global Economic Trends Analysis',
    content: 'Analyzing current global economic trends and their impact on various sectors...',
    image: 'https://picsum.photos/seed/eco8/400/200',
    likes: 134,
    comments: 47,
    postedAt: new Date('2024-03-08'),
  },
  {
    id: '9',
    community: {
      id: 'psy201',
      name: 'Psychology',
      avatar: 'PS'
    },
    title: 'Understanding Human Behavior',
    content: 'Latest research findings in human behavior and psychological patterns...',
    image: 'https://picsum.photos/seed/psy9/400/200',
    likes: 156,
    comments: 43,
    postedAt: new Date('2024-03-07'),
  },
  {
    id: '10',
    community: {
      id: 'lit101',
      name: 'Literature',
      avatar: 'LT'
    },
    title: 'Modern Literature Analysis',
    content: 'Exploring contemporary literature and its impact on society...',
    image: 'https://picsum.photos/seed/lit10/400/200',
    likes: 112,
    comments: 39,
    postedAt: new Date('2024-03-06'),
  },
];

const AnimatedView = Animated.createAnimatedComponent(View);

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const scrollY = useSharedValue(0);
  const headerHeight = useSharedValue(60);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      headerHeight.value = withSpring(
        Math.max(60, 120 - event.contentOffset.y),
        { damping: 15 }
      );
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    height: headerHeight.value,
    opacity: 1,
    transform: [{ translateY: 0 }],
  }));

  const handleJoinCommunity = (communityId: string, communityName: string) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(prev => prev.filter(id => id !== communityId));
      setSnackbarMessage(`Left ${communityName}`);
    } else {
      setJoinedCommunities(prev => [...prev, communityId]);
      setSnackbarMessage(`Joined ${communityName}`);
    }
    setSnackbarVisible(true);
  };

  const renderHeader = () => (
    <AnimatedView 
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.background,
          zIndex: 1000,
          paddingHorizontal: spacing.md,
          paddingTop: Platform.OS === 'ios' ? spacing.xxl : spacing.xl,
          paddingBottom: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surfaceVariant,
        },
        headerStyle,
      ]}
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: spacing.sm,
        marginTop: Platform.OS === 'ios' ? spacing.md : spacing.sm,
        height: 48,
      }}>
        <Avatar.Image
          size={36}
          source={{ uri: 'https://ui-avatars.com/api/?name=' + user?.fullName }}
          onTouchEnd={() => router.push("/(tabs)/profile")}
        />
        <Searchbar
          placeholder=""
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ 
            flex: 1,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.roundness * 3,
            height: 40,
          }}
          mode="bar"
          iconColor={theme.colors.primary}
        />
        <IconButton
          icon="plus-circle"
          size={26}
          mode="contained"
          containerColor={theme.colors.primary}
          iconColor={theme.colors.onPrimary}
          style={{
            margin: 0,
          }}
          onPress={() => setCreateModalVisible(true)}
        />
      </View>
    </AnimatedView>
  );

  const renderCreateModal = () => (
    <Portal>
      <Modal
        visible={createModalVisible}
        onDismiss={() => setCreateModalVisible(false)}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          margin: spacing.lg,
          borderRadius: theme.roundness,
          padding: spacing.lg,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
          <Text variant="headlineSmall">Create New Post</Text>
          <IconButton
            icon="close"
            size={24}
            onPress={() => setCreateModalVisible(false)}
          />
        </View>
        
        <Button
          mode="contained"
          icon="text"
          contentStyle={{ height: 50 }}
          style={{ marginBottom: spacing.md }}
          onPress={() => {
            setCreateModalVisible(false);
            router.push("/community/create");
          }}
        >
          Create Discussion
        </Button>

        <Button
          mode="outlined"
          icon="image"
          contentStyle={{ height: 50 }}
          onPress={() => {
            setCreateModalVisible(false);
            router.push("/community/create?type=media");
          }}
        >
          Share Media
        </Button>
      </Modal>
    </Portal>
  );

  const renderDiscussionCard = (discussion: any, isSuggested = false) => (
    <TouchableRipple
      key={discussion.id}
      onPress={() => router.push({
        pathname: "/community/[id]/post/[postId]",
        params: { id: discussion.community.id, postId: discussion.id }
      })}
    >
      <Surface style={{ backgroundColor: theme.colors.background, marginBottom: spacing.sm }}>
        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Avatar.Text
                size={24}
                label={discussion.community.avatar}
                style={{ marginRight: spacing.xs }}
              />
              <TouchableRipple
                onPress={() => router.push({
                  pathname: "/community/[id]",
                  params: { id: discussion.community.id }
                })}
              >
                <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
                  {discussion.community.name}
                </Text>
              </TouchableRipple>
              {isSuggested && (
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
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginLeft: spacing.xs }}>
                • {new Date(discussion.postedAt).toLocaleDateString()}
              </Text>
            </View>
            <Button
              mode={joinedCommunities.includes(discussion.community.id) ? "outlined" : "contained"}
              compact
              onPress={() => handleJoinCommunity(discussion.community.id, discussion.community.name)}
            >
              {joinedCommunities.includes(discussion.community.id) ? 'Leave' : 'Join'}
            </Button>
          </View>

          <Text variant="titleMedium" style={{ marginBottom: spacing.sm, lineHeight: 24 }}>
            {discussion.title}
          </Text>

          <Image
            source={{ uri: discussion.image }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: theme.roundness,
              marginBottom: spacing.sm,
            }}
          />

          <Text 
            variant="bodyMedium" 
            style={{ 
              color: theme.colors.onSurfaceVariant,
              marginBottom: spacing.sm,
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {discussion.content}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <Button
              mode="text"
              icon="heart-outline"
              compact
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              {discussion.likes}
            </Button>
            <Button
              mode="text"
              icon="comment-outline"
              compact
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              {discussion.comments}
            </Button>
            <View style={{ flex: 1 }} />
            <IconButton
              icon="bookmark-outline"
              size={20}
            />
          </View>
        </View>
        <Divider />
      </Surface>
    </TouchableRipple>
  );

  const renderSection = (title: string, discussions: any[], isSuggested = false) => (
    <View style={{ marginBottom: spacing.lg }}>
      <Text variant="titleLarge" style={{ 
        marginHorizontal: spacing.md,
        marginBottom: spacing.sm,
        color: theme.colors.onSurface,
      }}>
        {title}
      </Text>
      {discussions.map(discussion => renderDiscussionCard(discussion, isSuggested))}
    </View>
  );

  return (
    <SafeAreaView 
      style={[
        sharedStyles.container, 
        { 
          backgroundColor: theme.colors.background,
          paddingBottom: 0,
        }
      ]} 
      edges={['top']}
    >
      {renderHeader()}
      {renderCreateModal()}
      
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ 
          paddingTop: Platform.OS === 'ios' ? 140 : 130,
          paddingBottom: Platform.OS === 'ios' ? 16 : 8,
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {renderSection('Trending in Your Communities', trendingFromJoined)}
        {renderSection('Trending from Suggested Communities', trendingFromSuggested, true)}
      </Animated.ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}