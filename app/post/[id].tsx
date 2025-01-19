import { View, ScrollView, Image, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Surface, IconButton, ActivityIndicator, Button } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { mockComments, mockPosts } from '@/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sharedStyles } from '@/theme/styles';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { useState, useEffect, useRef } from 'react';
import { Comment } from '@/types';
import { FormTextInput } from '@/components/FormTextInput';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function PostScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [upvotes, setUpvotes] = useState(0);

  const scale = useSharedValue(1);
  const contentOpacity = useSharedValue(0);
  const commentsOpacity = useSharedValue(0);

  const post = mockPosts.find(p => p.id === id);

  const commentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setComments(mockComments);
      if (post) {
        setUpvotes(post.stats.upvotes);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      contentOpacity.value = withDelay(200, withSpring(1));
      commentsOpacity.value = withDelay(400, withSpring(1));
    }
  }, [isLoading]);

  const handleUpvote = () => {
    scale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    setIsUpvoted(prev => !prev);
    setUpvotes(prev => isUpvoted ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(prev => !prev);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        username: 'You',
      },
      content: newComment,
      timeAgo: 'just now',
      likes: 0,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: scale.value }],
  }));

  const commentsStyle = useAnimatedStyle(() => ({
    opacity: commentsOpacity.value,
  }));

  if (isLoading) {
    return (
      <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[sharedStyles.center, { flex: 1 }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[sharedStyles.center, { flex: 1 }]}>
          <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>Post not found</Text>
          <Button 
            mode="contained" 
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <AnimatedScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View style={{ margin: 16 }}>
            <AnimatedView
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
              style={[contentStyle]}
            >
              <Surface
                elevation={1}
                style={{
                  borderRadius: theme.roundness * 2,
                  backgroundColor: theme.colors.surface,
                  marginBottom: 8,
                }}
              >
                <View style={{ 
                  borderRadius: theme.roundness * 2,
                  overflow: 'hidden',
                }}>
                  {/* Header */}
                  <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                      icon="arrow-left"
                      size={24}
                      onPress={() => router.back()}
                      style={{ marginLeft: -8 }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 8 }}>
                      {post.community.icon ? (
                        <Image
                          source={{ uri: post.community.icon }}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            marginRight: 12,
                          }}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-group"
                          size={32}
                          color={theme.colors.primary}
                          style={{ marginRight: 12 }}
                        />
                      )}
                      <View>
                        <Text
                          variant="titleMedium"
                          style={{ color: theme.colors.primary }}
                        >
                          {post.community.name}
                        </Text>
                        <Text
                          variant="labelMedium"
                          style={{ color: theme.colors.onSurfaceVariant }}
                        >
                          {post.stats.timeAgo}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={{ padding: 16, paddingTop: 0 }}>
                    <Text
                      variant="headlineSmall"
                      style={{ color: theme.colors.onSurface, marginBottom: 12 }}
                    >
                      {post.content.title}
                    </Text>
                    {post.content.text && (
                      <Text
                        variant="bodyLarge"
                        style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}
                      >
                        {post.content.text}
                      </Text>
                    )}
                    {post.content.image && (
                      <Image
                        source={{ uri: post.content.image }}
                        style={{
                          width: '100%',
                          height: 300,
                          borderRadius: theme.roundness,
                          marginBottom: 16,
                        }}
                        resizeMode="cover"
                      />
                    )}
                  </View>

                  {/* Author */}
                  <View 
                    style={{ 
                      padding: 16, 
                      paddingTop: 0,
                      flexDirection: 'row', 
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: theme.colors.surfaceVariant,
                    }}
                  >
                    {post.author.avatar ? (
                      <Image
                        source={{ uri: post.author.avatar }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          marginRight: 12,
                        }}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account"
                        size={40}
                        color={theme.colors.onSurfaceVariant}
                        style={{ marginRight: 12 }}
                      />
                    )}
                    <View>
                      <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.onSurface }}
                      >
                        {post.author.username}
                      </Text>
                      <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        Author
                      </Text>
                    </View>
                  </View>

                  {/* Stats with animations */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 16,
                      paddingTop: 12,
                      paddingBottom: 12,
                    }}
                  >
                    <AnimatedPressable 
                      onPress={handleUpvote}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <IconButton
                        icon={isUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
                        iconColor={isUpvoted ? theme.colors.primary : theme.colors.onSurfaceVariant}
                        size={20}
                      />
                      <Text
                        variant="titleMedium"
                        style={{ 
                          color: isUpvoted ? theme.colors.primary : theme.colors.onSurfaceVariant,
                          marginLeft: -4,
                        }}
                      >
                        {upvotes}
                      </Text>
                    </AnimatedPressable>
                    <View 
                      style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        marginLeft: 16,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="comment-outline"
                        size={20}
                        color={theme.colors.onSurfaceVariant}
                      />
                      <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.onSurfaceVariant, marginLeft: 4 }}
                      >
                        {comments.length}
                      </Text>
                    </View>
                    <View style={{ marginLeft: 'auto' }}>
                      <IconButton
                        icon={isSaved ? "bookmark" : "bookmark-outline"}
                        iconColor={isSaved ? theme.colors.primary : theme.colors.onSurfaceVariant}
                        size={20}
                        onPress={handleSave}
                      />
                    </View>
                  </View>
                </View>
              </Surface>
            </AnimatedView>
          </View>

          {/* Comments section */}
          <AnimatedView 
            style={[{ padding: 16 }, commentsStyle]}
            entering={SlideInRight.duration(400)}
            exiting={SlideOutLeft.duration(300)}
          >
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onSurface, marginBottom: 16 }}
            >
              Comments ({comments.length})
            </Text>

            {/* Add comment */}
            <View style={{ marginBottom: 16 }}>
              <Surface
                elevation={1}
                style={{
                  borderRadius: theme.roundness * 2,
                  backgroundColor: theme.colors.surface,
                }}
              >
                <View style={{ 
                  borderRadius: theme.roundness * 2,
                  overflow: 'hidden',
                  padding: 16,
                }}>
                  <FormTextInput
                    ref={commentInputRef}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                    style={{
                      minHeight: 40,
                      maxHeight: 120,
                    }}
                    returnKeyType="send"
                    onSubmitEditing={handleAddComment}
                    enablesReturnKeyAutomatically
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
                    <Button
                      mode="contained"
                      onPress={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      Comment
                    </Button>
                  </View>
                </View>
              </Surface>
            </View>

            {/* Comments list */}
            {comments.map((comment, index) => (
              <View key={comment.id} style={{ marginBottom: 12 }}>
                <Surface
                  elevation={1}
                  style={{
                    borderRadius: theme.roundness * 2,
                    backgroundColor: theme.colors.surface,
                  }}
                >
                  <View style={{ 
                    borderRadius: theme.roundness * 2,
                    overflow: 'hidden',
                    padding: 16,
                  }}>
                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                      {comment.author.avatar ? (
                        <Image
                          source={{ uri: comment.author.avatar }}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            marginRight: 8,
                          }}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account"
                          size={24}
                          color={theme.colors.onSurfaceVariant}
                          style={{ marginRight: 8 }}
                        />
                      )}
                      <Text
                        variant="labelLarge"
                        style={{ color: theme.colors.onSurface }}
                      >
                        {comment.author.username}
                      </Text>
                      <Text
                        variant="labelMedium"
                        style={{ 
                          color: theme.colors.onSurfaceVariant,
                          marginLeft: 8,
                        }}
                      >
                        {comment.timeAgo}
                      </Text>
                    </View>
                    <Text style={{ color: theme.colors.onSurface }}>
                      {comment.content}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                      <IconButton
                        icon="heart-outline"
                        size={16}
                        onPress={() => {}}
                      />
                      <Text
                        variant="labelMedium"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {comment.likes}
                      </Text>
                      <IconButton
                        icon="reply"
                        size={16}
                        style={{ marginLeft: 8 }}
                        onPress={() => {}}
                      />
                    </View>
                  </View>
                </Surface>
              </View>
            ))}
          </AnimatedView>
        </AnimatedScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}