import { View, ScrollView, Image, Pressable } from 'react-native';
import { Text, IconButton, Button, Avatar, Divider, Surface, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '@/theme/styles';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { spacing } from '@/theme';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data for the post
const mockPost = {
  id: '1',
  title: 'Latest Developments in AI and Machine Learning',
  content: 'Discussing the recent breakthroughs in AI technology and their implications for future development. This field is rapidly evolving with new models and applications being developed every day. The impact on various sectors including education, healthcare, and research is profound and far-reaching.',
  image: 'https://picsum.photos/seed/ai1/400/200',
  author: {
    name: 'John Doe',
    avatar: 'JD',
    role: 'Student'
  },
  community: {
    id: 'cs101',
    name: 'Computer Science',
    avatar: 'CS'
  },
  stats: {
    likes: 156,
    comments: 45,
    postedAt: '2024-03-10'
  },
  comments: [
    {
      id: '1',
      author: {
        name: 'Alice Smith',
        avatar: 'AS'
      },
      content: 'This is fascinating! The potential applications in education are particularly interesting.',
      likes: 12,
      postedAt: '2 hours ago'
    },
    {
      id: '2',
      author: {
        name: 'Bob Johnson',
        avatar: 'BJ'
      },
      content: 'Great insights! Would love to hear more about the ethical implications.',
      likes: 8,
      postedAt: '1 hour ago'
    }
  ]
};

export default function PostScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id, postId } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(mockPost.stats.likes);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddComment = () => {
    // TODO: Implement comment addition
  };

  const navigateToCommunity = () => {
    router.push({
      pathname: "/community/[id]",
      params: { id: mockPost.community.id }
    });
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surfaceVariant,
      }}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <TouchableRipple
          onPress={navigateToCommunity}
          style={{ 
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: spacing.xs,
            borderRadius: theme.roundness,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Text 
              size={24} 
              label={mockPost.community.avatar}
              style={{ marginRight: spacing.xs }}
            />
            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
              {mockPost.community.name}
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={theme.colors.primary}
              style={{ marginLeft: spacing.xs }}
            />
          </View>
        </TouchableRipple>
      </View>

      <ScrollView>
        <Surface style={{ margin: spacing.md, borderRadius: theme.roundness }}>
          <View style={{ padding: spacing.md }}>
            {/* Author info */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
              <Avatar.Text size={40} label={mockPost.author.avatar} />
              <View style={{ marginLeft: spacing.sm }}>
                <Text variant="titleMedium">{mockPost.author.name}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {mockPost.author.role} • {mockPost.stats.postedAt}
                </Text>
              </View>
            </View>

            {/* Post content */}
            <Text variant="headlineSmall" style={{ marginBottom: spacing.sm }}>
              {mockPost.title}
            </Text>
            <Text variant="bodyLarge" style={{ marginBottom: spacing.md, color: theme.colors.onSurfaceVariant }}>
              {mockPost.content}
            </Text>
            <Image
              source={{ uri: mockPost.image }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: theme.roundness,
                marginBottom: spacing.md,
              }}
            />

            {/* Interaction buttons */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
              <Button
                mode="text"
                icon={isLiked ? "heart" : "heart-outline"}
                onPress={handleLike}
                textColor={isLiked ? theme.colors.error : theme.colors.onSurface}
              >
                {likes}
              </Button>
              <Button
                mode="text"
                icon="comment-outline"
              >
                {mockPost.stats.comments}
              </Button>
              <View style={{ flex: 1 }} />
              <IconButton
                icon={isSaved ? "bookmark" : "bookmark-outline"}
                onPress={handleSave}
                iconColor={isSaved ? theme.colors.primary : theme.colors.onSurface}
              />
            </View>
          </View>
        </Surface>

        {/* Comments section */}
        <View style={{ padding: spacing.md }}>
          <Text variant="titleMedium" style={{ marginBottom: spacing.md }}>
            Comments ({mockPost.comments.length})
          </Text>

          {mockPost.comments.map((comment) => (
            <Surface 
              key={comment.id} 
              style={{ 
                marginBottom: spacing.md,
                borderRadius: theme.roundness,
              }}
            >
              <View style={{ padding: spacing.md }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                  <Avatar.Text size={24} label={comment.author.avatar} />
                  <Text variant="titleSmall" style={{ marginLeft: spacing.xs }}>
                    {comment.author.name}
                  </Text>
                  <Text 
                    variant="bodySmall" 
                    style={{ 
                      marginLeft: spacing.xs,
                      color: theme.colors.onSurfaceVariant,
                    }}
                  >
                    • {comment.postedAt}
                  </Text>
                </View>
                <Text variant="bodyMedium">{comment.content}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
                  <Button
                    mode="text"
                    icon="heart-outline"
                    compact
                  >
                    {comment.likes}
                  </Button>
                  <Button
                    mode="text"
                    icon="reply"
                    compact
                  >
                    Reply
                  </Button>
                </View>
              </View>
            </Surface>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 