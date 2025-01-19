import { View, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, TextInput, Button, SegmentedButtons, Chip, IconButton } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { mockDepartments } from '@/data/mockUniversityData';

type PostType = 'discussion' | 'question' | 'event' | 'resource';

export default function CreateScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [postType, setPostType] = useState<PostType>('discussion');

  const handlePost = () => {
    // TODO: Implement post creation
    console.log({
      title,
      content,
      communities: selectedCommunities,
      type: postType,
    });
    router.back();
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
          icon="close" 
          onPress={() => router.back()} 
          style={{ margin: 0 }}
        />
        <Text variant="titleLarge" style={{ flex: 1, marginLeft: spacing.sm }}>Create Post</Text>
        <Button 
          mode="contained" 
          onPress={handlePost}
          disabled={!title || !content || selectedCommunities.length === 0}
        >
          Post
        </Button>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: spacing.md }}>
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

          <Text variant="titleMedium" style={{ marginBottom: spacing.sm }}>Post to Communities</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
            {mockDepartments.map(dept => (
              <Chip
                key={dept.id}
                selected={selectedCommunities.includes(dept.id)}
                onPress={() => {
                  if (selectedCommunities.includes(dept.id)) {
                    setSelectedCommunities(prev => prev.filter(id => id !== dept.id));
                  } else {
                    setSelectedCommunities(prev => [...prev, dept.id]);
                  }
                }}
                style={{ marginBottom: spacing.xs }}
                icon={dept.name.toLowerCase().includes('computer') ? 'laptop' : 
                      dept.name.toLowerCase().includes('math') ? 'calculator' :
                      dept.name.toLowerCase().includes('physics') ? 'atom' :
                      dept.name.toLowerCase().includes('biology') ? 'dna' :
                      'school'}
              >
                {dept.name}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 