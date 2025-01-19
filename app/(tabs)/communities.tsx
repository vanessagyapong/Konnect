import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, Card, Chip, Searchbar, IconButton, SegmentedButtons } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

// Mock data for different community categories
const CATEGORIES = [
  {
    id: 'academics',
    title: 'Academics',
    icon: 'school',
    communities: [
      { id: 'cs', name: 'Computer Science', members: '1.2k', icon: 'laptop' },
      { id: 'math', name: 'Mathematics', members: '800', icon: 'calculator' },
      { id: 'physics', name: 'Physics', members: '600', icon: 'atom' },
    ]
  },
  {
    id: 'campus',
    title: 'Campus Life',
    icon: 'school-outline',
    communities: [
      { id: 'housing', name: 'Campus Housing', members: '3.8k', icon: 'home-group' },
      { id: 'dining', name: 'Dining Hall', members: '2.5k', icon: 'food' },
      { id: 'events', name: 'Campus Events', members: '5k', icon: 'calendar' },
    ]
  },
  {
    id: 'clubs',
    title: 'Clubs & Organizations',
    icon: 'account-group',
    communities: [
      { id: 'robotics', name: 'Robotics Club', members: '250', icon: 'robot' },
      { id: 'finance', name: 'Finance Club', members: '3.2k', icon: 'cash' },
      { id: 'sports', name: 'Sports Club', members: '1.5k', icon: 'basketball' },
    ]
  },
  {
    id: 'support',
    title: 'Support & Resources',
    icon: 'lifebuoy',
    communities: [
      { id: 'health', name: 'Health & Wellness', members: '2.5k', icon: 'heart-pulse' },
      { id: 'career', name: 'Career Center', members: '5k', icon: 'briefcase' },
      { id: 'counseling', name: 'Counseling Services', members: '1.5k', icon: 'hand-heart' },
    ]
  }
];

export default function CommunitiesScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('browse');

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: spacing.md }}>
        <Text variant="headlineMedium" style={{ marginBottom: spacing.md }}>Communities</Text>
        
        <Searchbar
          placeholder="Search communities..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: spacing.md }}
        />

        <SegmentedButtons
          value={viewType}
          onValueChange={setViewType}
          buttons={[
            { value: 'browse', label: 'Browse' },
            { value: 'my', label: 'My Communities' },
            { value: 'suggested', label: 'Suggested' },
          ]}
          style={{ marginBottom: spacing.md }}
        />
      </View>

      <ScrollView>
        <View style={{ padding: spacing.md, paddingTop: 0 }}>
          {CATEGORIES.map(category => (
            <View key={category.id} style={{ marginBottom: spacing.lg }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                <MaterialCommunityIcons 
                  name={category.icon as any} 
                  size={24} 
                  color={theme.colors.primary}
                  style={{ marginRight: spacing.sm }}
                />
                <Text variant="titleLarge" style={{ color: theme.colors.primary }}>{category.title}</Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: spacing.sm }}
              >
                {category.communities.map(community => (
                  <Card 
                    key={community.id}
                    style={{ width: 200 }}
                    onPress={() => router.push({
                      pathname: "/community/[id]" as const,
                      params: { id: community.id }
                    })}
                  >
                    <Card.Content>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
                        <MaterialCommunityIcons 
                          name={community.icon as any} 
                          size={24} 
                          color={theme.colors.primary}
                          style={{ marginRight: spacing.xs }}
                        />
                        <Text variant="titleMedium" numberOfLines={1}>{community.name}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons 
                          name="account-group" 
                          size={16} 
                          color={theme.colors.outline}
                          style={{ marginRight: spacing.xs }}
                        />
                        <Text variant="bodySmall" style={{ color: theme.colors.outline }}>{community.members} members</Text>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 