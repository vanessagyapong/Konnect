import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text, Button, Chip, Portal, Modal, IconButton, TouchableRipple } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';
import { spacing } from '@/theme';
import { useRouter } from 'expo-router';

interface CommunityCardProps {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  memberCount?: number;
  isJoined?: boolean;
  onJoin?: (id: string) => void;
  onLeave?: (id: string) => void;
  width?: number;
  showPreview?: boolean;
}

export function CommunityCard({
  id,
  title,
  description,
  tags = [],
  memberCount,
  isJoined = false,
  onJoin,
  onLeave,
  width = 250,
  showPreview = true,
}: CommunityCardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleJoinPress = () => {
    if (isJoined) {
      onLeave?.(id);
    } else {
      onJoin?.(id);
    }
  };

  const handleCardPress = () => {
    if (showPreview) {
      setShowPreviewModal(true);
    } else {
      router.push({
        pathname: "/community/[id]" as const,
        params: { id }
      });
    }
  };

  const PreviewModal = () => (
    <Portal>
      <Modal
        visible={showPreviewModal}
        onDismiss={() => setShowPreviewModal(false)}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: spacing.lg,
          margin: spacing.lg,
          borderRadius: theme.roundness * 2,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <Text variant="headlineSmall">{title}</Text>
          <IconButton
            icon="close"
            onPress={() => setShowPreviewModal(false)}
          />
        </View>
        
        <Text variant="bodyLarge" style={{ marginBottom: spacing.md }}>
          {description}
        </Text>

        {tags.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md }}>
            {tags.map(tag => (
              <Chip
                key={tag}
                style={{ marginRight: spacing.xs, marginBottom: spacing.xs }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        )}

        {memberCount !== undefined && (
          <Chip icon="account-group" style={{ marginBottom: spacing.md }}>
            {memberCount} members
          </Chip>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            mode={isJoined ? "outlined" : "contained"}
            onPress={handleJoinPress}
            style={{ flex: 1, marginRight: spacing.sm }}
          >
            {isJoined ? 'Leave' : 'Join'}
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              setShowPreviewModal(false);
              router.push({
                pathname: "/community/[id]" as const,
                params: { id }
              });
            }}
            style={{ flex: 1 }}
          >
            View Details
          </Button>
        </View>
      </Modal>
    </Portal>
  );

  return (
    <>
      <Card
        style={{ width, marginRight: spacing.md }}
        onPress={handleCardPress}
      >
        <Card.Content>
          <TouchableRipple
            onPress={() => router.push({
              pathname: "/community/[id]" as const,
              params: { id }
            })}
          >
            <Text variant="titleMedium" style={{ 
              color: theme.colors.primary,
              marginBottom: spacing.xs 
            }}>
              {title}
            </Text>
          </TouchableRipple>
          <Text variant="bodySmall" numberOfLines={2} style={{ marginBottom: spacing.sm }}>
            {description}
          </Text>

          {tags.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.xs }}>
              {tags.slice(0, 2).map(tag => (
                <Chip
                  key={tag}
                  style={{ marginRight: spacing.xs, marginBottom: spacing.xs }}
                  compact
                >
                  {tag}
                </Chip>
              ))}
              {tags.length > 2 && (
                <Chip compact>+{tags.length - 2}</Chip>
              )}
            </View>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {memberCount !== undefined && (
              <Chip icon="account-group" compact>
                {memberCount}
              </Chip>
            )}
            <Button
              mode={isJoined ? "outlined" : "contained"}
              onPress={handleJoinPress}
              compact
            >
              {isJoined ? 'Leave' : 'Join'}
            </Button>
          </View>
        </Card.Content>
      </Card>
      {showPreview && <PreviewModal />}
    </>
  );
} 