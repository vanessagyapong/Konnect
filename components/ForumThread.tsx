import { View } from 'react-native';
import { List, Text, Avatar } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';

interface ForumThreadProps {
  title: string;
  lastPost: string;
  author: string;
  replies: number;
  onPress: () => void;
}

export default function ForumThread({
  title,
  lastPost,
  author,
  replies,
  onPress,
}: ForumThreadProps) {
  const { theme } = useTheme();

  return (
    <List.Item
      title={title}
      description={`Last post: ${lastPost}`}
      left={(props) => <Avatar.Text {...props} label={author[0]} />}
      right={(props) => <Text {...props}>{replies} replies</Text>}
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.surface,
        marginVertical: 1,
      }}
    />
  );
}