import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, TextInput, Button, SegmentedButtons, Chip } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { mockDepartments } from '@/data/mockUniversityData';

type PostType = 'discussion' | 'question' | 'event' | 'resource';

export default function CreatePostScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [postType, setPostType] = useState<PostType>('discussion');

  const handlePost = () => {
    // TODO: Implement post creation
    console.log({
      title,
      content,
      departments: selectedDepartments,
      type: postType,
    });
    router.back();
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={{ padding: spacing.md }}>
          <Text variant="headlineMedium" style={{ marginBottom: spacing.md }}>Create Post</Text>

          <SegmentedButtons
            value={postType}
            onValueChange={value => setPostType(value as PostType)}
            buttons={[
              { value: 'discussion', label: 'Discussion' },
              { value: 'question', label: 'Question' },
              { value: 'event', label: 'Event' },
              { value: 'resource', label: 'Resource' },
            ]}
            style={{ marginBottom: spacing.md }}
          />

          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={{ marginBottom: spacing.md }}
          />

          <TextInput
            label="Content"
            value={content}
            onChangeText={setContent}
            mode="outlined"
            multiline
            numberOfLines={6}
            style={{ marginBottom: spacing.md }}
          />

          <Text variant="titleMedium" style={{ marginBottom: spacing.sm }}>Select Departments</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md }}>
            {mockDepartments.map(dept => (
              <Chip
                key={dept.id}
                selected={selectedDepartments.includes(dept.id)}
                onPress={() => {
                  if (selectedDepartments.includes(dept.id)) {
                    setSelectedDepartments(prev => prev.filter(id => id !== dept.id));
                  } else {
                    setSelectedDepartments(prev => [...prev, dept.id]);
                  }
                }}
                style={{ marginBottom: spacing.xs }}
              >
                {dept.name}
              </Chip>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handlePost}
            disabled={!title || !content || selectedDepartments.length === 0}
          >
            Post
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 