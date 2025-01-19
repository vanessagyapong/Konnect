import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn,
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
} from 'react-native-reanimated';

interface PostCardProps {
  id: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  community: {
    id: string;
    name: string;
    icon?: string;
  };
  content: {
    title: string;
    text?: string;
    image?: string;
  };
  stats: {
    upvotes: number;
    comments: number;
    timeAgo: string;
  };
  isUpvoted?: boolean;
  isSaved?: boolean;
  onUpvote?: () => void;
  onSave?: () => void;
}

const AnimatedSurface = Animated.createAnimatedComponent(Surface);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PostCard({
  id,
  author = {
    id: '',
    username: 'Anonymous',
  },
  community = {
    id: '',
    name: 'General',
  },
  content = {
    title: '',
  },
  stats = {
    upvotes: 0,
    comments: 0,
    timeAgo: 'just now',
  },
  isUpvoted = false,
  isSaved = false,
  onUpvote,
  onSave,
}: PostCardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const upvoteScale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleUpvote = () => {
    upvoteScale.value = withSpring(1.2, {}, () => {
      upvoteScale.value = withSpring(1);
    });
    onUpvote?.();
  };

  const handleSave = () => {
    savedScale.value = withSpring(1.2, {}, () => {
      savedScale.value = withSpring(1);
    });
    onSave?.();
  };

  const upvoteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: upvoteScale.value }],
  }));

  const savedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: savedScale.value }],
  }));

  const handleCommunityPress = () => {
    router.push({
      pathname: "/community/[id]" as const,
      params: { id: community.id }
    });
  };

  const handlePostPress = () => {
    router.push({
      pathname: "/post/[id]" as const,
      params: { id }
    });
  };

  const handleAuthorPress = () => {
    router.push({
      pathname: "/(tabs)/profile" as const,
      params: { userId: author.id }
    });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={cardStyle}
    >
      <AnimatedSurface
        elevation={1}
        style={{
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: theme.roundness * 1.5,
          overflow: 'hidden',
          backgroundColor: theme.colors.surface,
        }}
      >
        {/* Header */}
        <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
          <Pressable 
            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            onPress={community?.id ? handleCommunityPress : undefined}
          >
            {community?.icon ? (
              <Image
                source={{ uri: community.icon }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  marginRight: 8,
                }}
                resizeMode="cover"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 8 }}
              />
            )}
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.primary }}
            >
              {community?.name || 'General'}
            </Text>
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant, marginHorizontal: 4 }}
            >
              • {stats?.timeAgo || 'just now'}
            </Text>
          </Pressable>
          <IconButton
            icon={isSaved ? "bookmark" : "bookmark-outline"}
            iconColor={isSaved ? theme.colors.primary : theme.colors.onSurfaceVariant}
            size={20}
            onPress={handleSave}
            animated
            style={savedStyle}
          />
        </View>

        {/* Content */}
        <Pressable 
          style={{ padding: 12, paddingTop: 0 }}
          onPress={handlePostPress}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface, marginBottom: 8 }}
          >
            {content?.title || 'Untitled Post'}
          </Text>
          {content?.text && (
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
              numberOfLines={3}
            >
              {content.text}
            </Text>
          )}
          {content?.image && (
            <Image
              source={{ uri: content.image }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: theme.roundness,
                marginTop: 8,
              }}
              resizeMode="cover"
            />
          )}
        </Pressable>

        {/* Footer */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            paddingTop: 4,
          }}
        >
          <Animated.View style={upvoteStyle}>
            <IconButton
              icon={isUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
              iconColor={isUpvoted ? theme.colors.primary : theme.colors.onSurfaceVariant}
              size={20}
              onPress={handleUpvote}
              animated
            />
          </Animated.View>
          <Text
            variant="labelLarge"
            style={{
              color: isUpvoted ? theme.colors.primary : theme.colors.onSurfaceVariant,
              marginLeft: -4,
            }}
          >
            {stats?.upvotes || 0}
          </Text>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 16,
            }}
            onPress={handlePostPress}
          >
            <MaterialCommunityIcons
              name="comment-outline"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginLeft: 4,
              }}
            >
              {stats?.comments || 0}
            </Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
            onPress={author?.id ? handleAuthorPress : undefined}
          >
            {author?.avatar ? (
              <Image
                source={{ uri: author.avatar }}
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
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {author?.username || 'Anonymous'}
            </Text>
          </Pressable>
        </View>
      </AnimatedSurface>
    </AnimatedPressable>
  );
}