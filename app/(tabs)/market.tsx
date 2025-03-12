import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, Searchbar, Surface, Avatar, Button, Chip, TouchableRipple, FAB, Card } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { categories, CategoryKey } from '@/data/marketCategories';

// Mock listings data
const mockListings = [
  {
    id: '1',
    title: 'Calculus Textbook',
    description: 'Calculus: Early Transcendentals, 8th Edition. Good condition, minimal highlighting.',
    price: 50,
    category: 'textbooks',
    subcategory: 'Mathematics',
    condition: 'good',
    courseCode: 'MATH201',
    location: 'Library',
    images: ['https://picsum.photos/seed/1/400/300'],
    seller: {
      id: '1',
      name: 'John Doe',
      avatar: 'JD'
    },
    postedAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    title: 'TI-84 Plus Calculator',
    description: 'Texas Instruments TI-84 Plus graphing calculator. Like new condition.',
    price: 75,
    category: 'electronics',
    subcategory: 'Calculators',
    condition: 'like_new',
    location: 'Science Building',
    images: ['https://picsum.photos/seed/2/400/300'],
    seller: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'JS'
    },
    postedAt: new Date('2024-03-11'),
  },
  // Add more mock listings as needed
];

export default function MarketScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch && (!selectedCategory || listing.category === selectedCategory);
  });

  const renderListingCard = (listing: typeof mockListings[0]) => (
    <Card
      key={listing.id}
      style={{ marginBottom: spacing.md }}
      onPress={() => router.push({
        pathname: "./[id]",
        params: { id: listing.id }
      })}
    >
      {listing.images[0] && (
        <Card.Cover source={{ uri: listing.images[0] }} />
      )}
      <Card.Content style={{ paddingVertical: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" style={{ marginBottom: spacing.xs }}>
              {listing.title}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              ${listing.price}
            </Text>
          </View>
          <Chip compact style={{ marginLeft: spacing.sm }}>
            {listing.condition}
          </Chip>
        </View>

        <Text
          variant="bodyMedium"
          numberOfLines={2}
          style={{
            color: theme.colors.onSurfaceVariant,
            marginVertical: spacing.xs,
          }}
        >
          {listing.description}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
          <Avatar.Text
            size={24}
            label={listing.seller.avatar}
            style={{ marginRight: spacing.xs }}
          />
          <Text variant="bodySmall" style={{ flex: 1 }}>
            {listing.seller.name}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {new Date(listing.postedAt).toLocaleDateString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderCategorySection = (categoryKey: string) => {
    const categoryListings = filteredListings.filter(listing => listing.category === categoryKey);
    
    if (categoryListings.length === 0) return null;

    return (
      <View key={categoryKey} style={{ marginBottom: spacing.lg }}>
        <Text variant="titleMedium" style={{ marginBottom: spacing.sm }}>
          {categories[categoryKey as CategoryKey].name}
        </Text>
        {categoryListings.map(renderListingCard)}
      </View>
    );
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={{ padding: spacing.md }}>
        <Text variant="headlineMedium" style={{ marginBottom: spacing.md }}>Marketplace</Text>
        <Searchbar
          placeholder="Search listings..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            marginBottom: spacing.md,
            backgroundColor: theme.colors.surfaceVariant,
          }}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: spacing.md }}
        >
          <View style={{ flexDirection: 'row', gap: spacing.xs }}>
            <Chip
              selected={!selectedCategory}
              onPress={() => setSelectedCategory(null)}
              style={{ marginRight: spacing.xs }}
            >
              All
            </Chip>
            {Object.entries(categories).map(([key, category]) => (
              <Chip
                key={key}
                selected={selectedCategory === key}
                onPress={() => setSelectedCategory(key as CategoryKey)}
                style={{ marginRight: spacing.xs }}
              >
                {category.name}
              </Chip>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: spacing.md }}>
          {selectedCategory
            ? renderCategorySection(selectedCategory)
            : Object.keys(categories).map(renderCategorySection)}
          
          {filteredListings.length === 0 && (
            <View style={{ 
              padding: spacing.xl,
              alignItems: 'center',
            }}>
              <Text 
                variant="titleMedium" 
                style={{ 
                  color: theme.colors.onSurfaceVariant,
                  textAlign: 'center',
                  marginBottom: spacing.sm,
                }}
              >
                No listings found
              </Text>
              <Text 
                variant="bodyMedium" 
                style={{ 
                  color: theme.colors.onSurfaceVariant,
                  textAlign: 'center',
                  marginBottom: spacing.lg,
                }}
              >
                Try adjusting your search or create a new listing
              </Text>
              <Button
                mode="contained"
                onPress={() => router.push('/market/create')}
              >
                Create Listing
              </Button>
            </View>
          )}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        label="Create Listing"
        style={{
          position: 'absolute',
          margin: spacing.lg,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => router.push('/market/create')}
      />
    </SafeAreaView>
  );
} 