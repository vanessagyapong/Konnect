import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button, Avatar, TextInput, IconButton, Divider } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { spacing } from '@/theme';
import { Post, Comment } from '@/types/community';
import * as Haptics from 'expo-haptics';

interface CommunityPostProps {
  post: Post;
  comments: Comment[];
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export function CommunityPost({
  post,
  comments,
  currentUserId,
  onLike,
  onComment,
  onLikeComment,
}: CommunityPostProps) {
  const { theme } = useTheme();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLike(post.id);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment.trim());
      setNewComment('');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleLikeComment = (commentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLikeComment(commentId);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Card style={{ marginBottom: spacing.md }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
          <Avatar.Text
            size={40}
            label={post.userName.split(' ').map(n => n[0]).join('')}
            style={{ marginRight: spacing.sm }}
          />
          <View>
            <Text variant="titleMedium">{post.userName}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {formatDate(post.createdAt)}
            </Text>
          </View>
        </View>

        <Text variant="bodyLarge" style={{ marginBottom: spacing.md }}>
          {post.content}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
          <Button
            mode="text"
            icon={post.likes.includes(currentUserId) ? "heart" : "heart-outline"}
            onPress={handleLike}
            textColor={post.likes.includes(currentUserId) ? theme.colors.error : theme.colors.onSurface}
          >
            {post.likes.length > 0 ? post.likes.length : ''}
          </Button>
          <Button
            mode="text"
            icon="comment-outline"
            onPress={() => setShowComments(!showComments)}
          >
            {post.commentCount > 0 ? post.commentCount : ''}
          </Button>
        </View>

        {showComments && (
          <View>
            <Divider style={{ marginVertical: spacing.sm }} />
            
            {comments.map(comment => (
              <View key={comment.id} style={{ marginBottom: spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar.Text
                    size={24}
                    label={comment.userName.split(' ').map(n => n[0]).join('')}
                    style={{ marginRight: spacing.xs }}
                  />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text variant="bodyMedium" style={{ fontWeight: 'bold', marginRight: spacing.xs }}>
                        {comment.userName}
                      </Text>
                      <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                        {formatDate(comment.createdAt)}
                      </Text>
                    </View>
                    <Text variant="bodyMedium">{comment.content}</Text>
                  </View>
                  <IconButton
                    icon={comment.likes.includes(currentUserId) ? "heart" : "heart-outline"}
                    size={20}
                    onPress={() => handleLikeComment(comment.id)}
                    iconColor={comment.likes.includes(currentUserId) ? theme.colors.error : theme.colors.onSurface}
                  />
                </View>
              </View>
            ))}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
              <TextInput
                mode="outlined"
                placeholder="Write a comment..."
                value={newComment}
                onChangeText={setNewComment}
                style={{ flex: 1, marginRight: spacing.xs }}
                dense
              />
              <IconButton
                icon="send"
                size={20}
                onPress={handleComment}
                disabled={!newComment.trim()}
              />
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
} 