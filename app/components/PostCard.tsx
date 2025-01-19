import { View } from 'react-native';
import { Card, Text, IconButton, useTheme } from 'react-native-paper';
import { spacing } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Author, Community, PostContent, PostStats } from '../../types/post';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export interface PostCardProps {
  id: string;
  author: Author & { nameColor?: string };
  community: Community;
  content: PostContent;
  stats: PostStats;
  onUpvote: () => void;
  onSave: () => void;
  isImportant?: boolean;
  onToggleImportant: () => void;
}

export default function PostCard({
  id,
  author,
  community,
  content,
  stats,
  onUpvote,
  onSave,
  isImportant,
  onToggleImportant
}: PostCardProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` }
    ]
  }));

  const handleUpvote = () => {
    scale.value = withSequence(
      withSpring(1.05),
      withSpring(1)
    );
    onUpvote();
  };

  const handleStar = () => {
    rotation.value = withSequence(
      withSpring(15),
      withSpring(-15),
      withSpring(0)
    );
    onToggleImportant();
  };

  return (
    <AnimatedCard
      style={[
        animatedStyle,
        {
          backgroundColor: theme.colors.surface,
          marginVertical: spacing.xs,
          borderRadius: theme.roundness,
          elevation: 2,
          borderColor: content.isImportant ? theme.colors.tertiary : theme.colors.surfaceVariant,
          borderWidth: content.isImportant ? 1 : 0,
        }
      ]}
    >
      <Card.Title
        title={author.username}
        subtitle={community.name}
        titleStyle={{ 
          color: author.nameColor || theme.colors.primary,
          fontWeight: '600'
        }}
        subtitleStyle={{
          color: theme.colors.secondary
        }}
        left={props => (
          <MaterialCommunityIcons
            name={community.icon}
            size={props.size}
            color={theme.colors.secondary}
          />
        )}
        right={props => (
          <IconButton
            {...props}
            icon={isImportant ? "star" : "star-outline"}
            iconColor={isImportant ? theme.colors.tertiary : theme.colors.onSurface}
            onPress={handleStar}
          />
        )}
      />
      <Card.Content>
        <Text 
          variant="titleMedium" 
          style={{ 
            marginBottom: spacing.xs,
            color: theme.colors.primary,
            fontWeight: content.isPinned || content.isImportant ? '700' : '500'
          }}
        >
          {content.isPinned ? '📌 ' : content.isImportant ? '⭐ ' : ''}
          {content.title}
        </Text>
        <Text 
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurface,
            lineHeight: 22
          }}
        >
          {content.text}
        </Text>
        {content.image && (
          <Card.Cover 
            source={{ uri: content.image }} 
            style={{ 
              marginTop: spacing.sm,
              borderRadius: theme.roundness - 4
            }} 
          />
        )}
      </Card.Content>
      <Card.Actions>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon="arrow-up-bold"
            iconColor={theme.colors.primary}
            onPress={handleUpvote}
          />
          <Text style={{ color: theme.colors.primary }}>{stats.upvotes}</Text>
          <IconButton
            icon="comment-outline"
            iconColor={theme.colors.onSurfaceVariant}
            disabled
          />
          <Text style={{ color: theme.colors.onSurfaceVariant }}>{stats.comments}</Text>
          <Text style={{ marginLeft: 'auto', color: theme.colors.onSurfaceVariant }}>{stats.timeAgo}</Text>
        </View>
        <IconButton
          icon="bookmark-outline"
          iconColor={theme.colors.secondary}
          onPress={onSave}
        />
      </Card.Actions>
    </AnimatedCard>
  );
} 