import { View, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';
import PostCard from '@/components/PostCard';
import { sharedStyles } from '@/theme/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockPosts } from '../../data';
import type { Post } from '../../types/post';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { spacing } from '@/theme';
import { Text, Divider, FAB, Searchbar, IconButton, List, Card } from 'react-native-paper';
import { useState, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Drawer from 'react-native-drawer';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollY = useSharedValue(0);

  const filterPosts = (posts: typeof mockPosts) => {
    if (!searchQuery) return posts;
    
    return posts.filter((post) => 
      post.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.community.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0],
      'clamp'
    );

    return {
      opacity: withSpring(opacity),
      transform: [
        {
          translateY: withSpring(interpolate(
            scrollY.value,
            [0, 50],
            [0, -50],
            'clamp'
          )),
        },
      ],
    };
  });

  const drawerContent = (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: spacing.md }}>
      <Text variant="titleLarge" style={{ marginBottom: spacing.md }}>My Communities</Text>
      
      <List.Section title="My Courses">
        <List.Item
          title="CS101: Intro to Programming"
          description="180 students"
          left={props => <List.Icon {...props} icon="laptop" />}
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: 'cs101' }})}
        />
        <List.Item
          title="MATH201: Linear Algebra"
          description="150 students"
          left={props => <List.Icon {...props} icon="calculator" />}
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: 'math201' }})}
        />
      </List.Section>

      <List.Section title="Student Organizations">
        <List.Item
          title="Programming Club"
          description="Tech enthusiasts"
          left={props => <List.Icon {...props} icon="code-braces" />}
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: 'programming-club' }})}
        />
        <List.Item
          title="Finance Club"
          description="Investment insights"
          left={props => <List.Icon {...props} icon="cash" />}
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: 'finance-club' }})}
        />
      </List.Section>

      <List.Section title="Campus Life">
        <List.Item
          title="Sports & Recreation"
          description="Stay active"
          left={props => <List.Icon {...props} icon="basketball" />}
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: 'sports' }})}
        />
        <List.Item
          title="Events & Activities"
          description="What's happening"
          left={props => <List.Icon {...props} icon="calendar" />}
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: 'events' }})}
        />
      </List.Section>
    </View>
  );

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        type="overlay"
        content={drawerContent}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        side="right"
      >
        <ScrollView 
          style={{ backgroundColor: theme.colors.background }}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={[theme.colors.primary, theme.colors.secondary]}
              tintColor={theme.colors.primary}
            />
          }
        >
          <Animated.View
            style={[{
              padding: spacing.xs,
              paddingHorizontal: spacing.sm,
              backgroundColor: theme.colors.background,
            }, headerStyle]}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: spacing.md,
              backgroundColor: 'transparent'
            }}>
              <Text variant="headlineMedium">Home</Text>
              <IconButton 
                icon="account-group"
                onPress={() => setDrawerOpen(true)}
              />
            </View>

            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{ 
                marginBottom: spacing.lg,
                elevation: 2,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.roundness,
              }}
              iconColor={theme.colors.primary}
              inputStyle={{ color: theme.colors.onSurface }}
              placeholderTextColor={theme.colors.onSurfaceDisabled}
              theme={{
                ...theme,
                fonts: {
                  ...theme.fonts,
                  default: {
                    ...theme.fonts.default,
                    fontStyle: 'italic',
                  }
                }
              }}
            />

            {/* Trending Discussions */}
            <View style={{ marginBottom: spacing.lg }}>
              <Text variant="titleMedium" style={{ marginBottom: spacing.sm, color: theme.colors.primary }}>
                Trending Discussions
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: spacing.md }}
              >
                {mockPosts.slice(0, 3).map((post) => (
                  <Card 
                    key={post.id}
                    style={{ 
                      width: 280,
                      backgroundColor: theme.colors.surface,
                      borderRadius: theme.roundness,
                    }}
                  >
                    <Card.Title
                      title={post.content.title}
                      subtitle={`${post.community.name} • ${post.stats.upvotes} upvotes`}
                      left={props => (
                        <MaterialCommunityIcons
                          name={post.community.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                          size={props.size}
                          color={theme.colors.primary}
                        />
                      )}
                    />
                  </Card>
                ))}
              </ScrollView>
            </View>

            {/* Posts */}
            <View style={{ gap: spacing.md }}>
              {filterPosts(mockPosts).map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  community={post.community}
                  content={post.content}
                  stats={post.stats}
                  onUpvote={() => console.log('Upvoted:', post.id)}
                  onSave={() => console.log('Saved:', post.id)}
                />
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: spacing.lg,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary,
          }}
          onPress={() => router.push("/(modals)/create")}
        />
      </Drawer>
    </SafeAreaView>
  );
}