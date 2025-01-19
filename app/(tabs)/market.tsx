import { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, Searchbar, Card, IconButton, Menu, Button, Chip, Surface, FAB } from 'react-native-paper';
import { sharedStyles } from '@/theme/styles';
import { spacing } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { mockMarketListings } from '@/data/mockUniversityData';
import { MarketListing } from '@/types/university';
import { useAuth } from '@/contexts/AuthContext';

type SortOption = 'newest' | 'price-asc' | 'price-desc';

export default function MarketScreen() {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MarketListing['type'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };

  const sortListings = (listings: MarketListing[]) => {
    switch (sortBy) {
      case 'price-asc':
        return [...listings].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...listings].sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return [...listings].sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
    }
  };

  const filteredListings = sortListings(
    mockMarketListings.filter(listing => 
      (selectedCategory === 'all' || listing.type === selectedCategory) &&
      (listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       listing.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const categoryIcons = {
    textbook: 'book-open-variant',
    housing: 'home',
    service: 'account-wrench',
    equipment: 'laptop',
    other: 'dots-horizontal',
  };

  const handleItemAction = async (itemId: string, action: 'edit' | 'delete' | 'mark-sold') => {
    // TODO: Implement item actions
    console.log(`${action} item ${itemId}`);
    setMenuVisible(false);
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <Text variant="headlineMedium">Student Market</Text>
          <View style={{ flexDirection: 'row' }}>
            <Menu
              visible={sortMenuVisible}
              onDismiss={() => setSortMenuVisible(false)}
              anchor={
                <IconButton
                  icon="sort"
                  size={24}
                  onPress={() => setSortMenuVisible(true)}
                />
              }
            >
              <Menu.Item
                title="Newest First"
                onPress={() => {
                  setSortBy('newest');
                  setSortMenuVisible(false);
                }}
              />
              <Menu.Item
                title="Price: Low to High"
                onPress={() => {
                  setSortBy('price-asc');
                  setSortMenuVisible(false);
                }}
              />
              <Menu.Item
                title="Price: High to Low"
                onPress={() => {
                  setSortBy('price-desc');
                  setSortMenuVisible(false);
                }}
              />
            </Menu>
            <IconButton
              icon="plus-circle"
              size={24}
              onPress={() => console.log('Create listing')}
            />
          </View>
        </View>

        <Searchbar
          placeholder="Search listings..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: spacing.md }}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: spacing.md }}
        >
          <Chip
            selected={selectedCategory === 'all'}
            onPress={() => setSelectedCategory('all')}
            style={{ marginRight: spacing.sm }}
          >
            All
          </Chip>
          <Chip
            selected={selectedCategory === 'textbook'}
            onPress={() => setSelectedCategory('textbook')}
            style={{ marginRight: spacing.sm }}
            icon="book-open-variant"
          >
            Textbooks
          </Chip>
          <Chip
            selected={selectedCategory === 'furniture'}
            onPress={() => setSelectedCategory('furniture')}
            style={{ marginRight: spacing.sm }}
            icon="home"
          >
            Housing
          </Chip>
          <Chip
            selected={selectedCategory === 'electronics'}
            onPress={() => setSelectedCategory('electronics')}
            style={{ marginRight: spacing.sm }}
            icon="devices"
          >
            Electronics
          </Chip>
          <Chip
            selected={selectedCategory === 'other'}
            onPress={() => setSelectedCategory('other')}
            style={{ marginRight: spacing.sm }}
            icon="dots-horizontal"
          >
            Other
          </Chip>
        </ScrollView>

        <ScrollView>
          {filteredListings.map(listing => (
            <Surface
              key={listing.id}
              style={{
                margin: 16,
                padding: 16,
                borderRadius: theme.roundness,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text variant="titleLarge">{listing.title}</Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.primary, marginTop: 4 }}>
                    {listing.price}
                  </Text>
                  <Text variant="bodyMedium" style={{ marginTop: 8 }}>{listing.description}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      Posted by {listing.seller} • {getTimeAgo(listing.postedAt)}
                    </Text>
                    <Chip 
                      style={{ marginLeft: 8 }} 
                      compact
                    >
                      {listing.type}
                    </Chip>
                    {listing.status === 'sold' && (
                      <Chip 
                        style={{ marginLeft: 8 }} 
                        compact
                      >
                        Sold
                      </Chip>
                    )}
                  </View>
                </View>
                
                {isAdmin() && (
                  <Menu
                    visible={menuVisible && selectedItem === listing.id}
                    onDismiss={() => {
                      setMenuVisible(false);
                      setSelectedItem(null);
                    }}
                    anchor={
                      <IconButton
                        icon="dots-vertical"
                        onPress={() => {
                          setSelectedItem(listing.id);
                          setMenuVisible(true);
                        }}
                      />
                    }
                  >
                    <Menu.Item 
                      onPress={() => handleItemAction(listing.id, 'edit')} 
                      title="Edit"
                      leadingIcon="pencil"
                    />
                    <Menu.Item 
                      onPress={() => handleItemAction(listing.id, 'delete')} 
                      title="Delete"
                      leadingIcon="delete"
                    />
                    {listing.status === 'active' && (
                      <Menu.Item 
                        onPress={() => handleItemAction(listing.id, 'mark-sold')} 
                        title="Mark as Sold"
                        leadingIcon="check-circle"
                      />
                    )}
                  </Menu>
                )}
              </View>
            </Surface>
          ))}
        </ScrollView>
      </View>

      {isAdmin() && (
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            // TODO: Implement new item creation
            console.log('Create new item');
          }}
        />
      )}
    </SafeAreaView>
  );
} 