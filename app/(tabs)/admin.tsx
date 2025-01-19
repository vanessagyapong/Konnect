import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Surface, Button, DataTable, Searchbar, SegmentedButtons, IconButton, Menu, Divider, FAB } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { sharedStyles } from '../../theme/styles';

// Mock data - replace with actual API calls
const mockUsers = [
  { id: '1', email: 'user1@example.com', username: 'user1', role: 'user', status: 'active' },
  { id: '2', email: 'admin@example.com', username: 'admin', role: 'admin', status: 'active' },
  { id: '3', email: 'mod@example.com', username: 'moderator', role: 'moderator', status: 'active' },
  { id: '4', email: 'banned@example.com', username: 'banned_user', role: 'user', status: 'banned' },
];

const mockReports = [
  { id: '1', type: 'post', reportedBy: 'user1', reason: 'Inappropriate content', status: 'pending' },
  { id: '2', type: 'comment', reportedBy: 'user2', reason: 'Spam', status: 'resolved' },
];

const mockNotices = [
  { id: '1', title: 'Campus Event', content: 'Annual sports day next week', isPinned: true, createdAt: '2024-01-15' },
  { id: '2', title: 'Library Notice', content: 'Extended hours during finals', isPinned: false, createdAt: '2024-01-14' },
];

const mockMarketItems = [
  { id: '1', title: 'Used Textbook', price: '$50', seller: 'user1', status: 'active', createdAt: '2024-01-15' },
  { id: '2', title: 'Calculator', price: '$20', seller: 'user2', status: 'sold', createdAt: '2024-01-14' },
];

type Tab = 'users' | 'reports' | 'noticeboard' | 'marketplace' | 'settings';

export default function AdminDashboard() {
  const { theme } = useTheme();
  const { user, isAdmin, updateUserRole, banUser, unbanUser } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Redirect non-admin users
  if (!isAdmin()) {
    router.replace('/(tabs)');
    return null;
  }

  const handleUserAction = async (userId: string, action: 'ban' | 'unban' | 'role', role?: string) => {
    try {
      if (action === 'ban') {
        await banUser(userId);
      } else if (action === 'unban') {
        await unbanUser(userId);
      } else if (action === 'role' && role) {
        await updateUserRole(userId, role as any);
      }
      // Refresh user list
    } catch (error) {
      console.error('Error performing user action:', error);
    }
  };

  const handleNoticeAction = async (noticeId: string, action: 'edit' | 'delete' | 'pin') => {
    // TODO: Implement notice actions
    console.log(`${action} notice ${noticeId}`);
  };

  const handleMarketItemAction = async (itemId: string, action: 'edit' | 'delete' | 'mark-sold') => {
    // TODO: Implement marketplace item actions
    console.log(`${action} item ${itemId}`);
  };

  const renderUsersTab = () => (
    <View>
      <Searchbar
        placeholder="Search users..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 16 }}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {mockUsers.map((user) => (
          <DataTable.Row key={user.id}>
            <DataTable.Cell>{user.username}</DataTable.Cell>
            <DataTable.Cell>{user.email}</DataTable.Cell>
            <DataTable.Cell>{user.role}</DataTable.Cell>
            <DataTable.Cell>{user.status}</DataTable.Cell>
            <DataTable.Cell>
              <Menu
                visible={menuVisible && selectedUser === user.id}
                onDismiss={() => {
                  setMenuVisible(false);
                  setSelectedUser(null);
                }}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    onPress={() => {
                      setSelectedUser(user.id);
                      setMenuVisible(true);
                    }}
                  />
                }
              >
                <Menu.Item 
                  onPress={() => handleUserAction(user.id, 'role', 'admin')} 
                  title="Make Admin"
                  disabled={user.role === 'admin'}
                />
                <Menu.Item 
                  onPress={() => handleUserAction(user.id, 'role', 'moderator')} 
                  title="Make Moderator"
                  disabled={user.role === 'moderator'}
                />
                <Menu.Item 
                  onPress={() => handleUserAction(user.id, 'role', 'user')} 
                  title="Make User"
                  disabled={user.role === 'user'}
                />
                <Divider />
                {user.status === 'active' ? (
                  <Menu.Item 
                    onPress={() => handleUserAction(user.id, 'ban')} 
                    title="Ban User"
                  />
                ) : (
                  <Menu.Item 
                    onPress={() => handleUserAction(user.id, 'unban')} 
                    title="Unban User"
                  />
                )}
              </Menu>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );

  const renderReportsTab = () => (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Reported By</DataTable.Title>
          <DataTable.Title>Reason</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {mockReports.map((report) => (
          <DataTable.Row key={report.id}>
            <DataTable.Cell>{report.type}</DataTable.Cell>
            <DataTable.Cell>{report.reportedBy}</DataTable.Cell>
            <DataTable.Cell>{report.reason}</DataTable.Cell>
            <DataTable.Cell>{report.status}</DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="eye"
                onPress={() => {
                  // TODO: Implement view report details
                }}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );

  const renderNoticeboardTab = () => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
        <Searchbar
          placeholder="Search notices..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ flex: 1, marginRight: 16 }}
        />
        <Button 
          mode="contained" 
          onPress={() => {/* TODO: Implement new notice creation */}}
          icon="plus"
        >
          New Notice
        </Button>
      </View>
      
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Created At</DataTable.Title>
          <DataTable.Title>Pinned</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {mockNotices.map((notice) => (
          <DataTable.Row key={notice.id}>
            <DataTable.Cell>{notice.title}</DataTable.Cell>
            <DataTable.Cell>{notice.createdAt}</DataTable.Cell>
            <DataTable.Cell>{notice.isPinned ? 'Yes' : 'No'}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="pencil"
                  onPress={() => handleNoticeAction(notice.id, 'edit')}
                />
                <IconButton
                  icon="pin"
                  onPress={() => handleNoticeAction(notice.id, 'pin')}
                />
                <IconButton
                  icon="delete"
                  onPress={() => handleNoticeAction(notice.id, 'delete')}
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );

  const renderMarketplaceTab = () => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
        <Searchbar
          placeholder="Search marketplace..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ flex: 1, marginRight: 16 }}
        />
        <Button 
          mode="contained" 
          onPress={() => {/* TODO: Implement new item creation */}}
          icon="plus"
        >
          New Item
        </Button>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Price</DataTable.Title>
          <DataTable.Title>Seller</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {mockMarketItems.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.title}</DataTable.Cell>
            <DataTable.Cell>{item.price}</DataTable.Cell>
            <DataTable.Cell>{item.seller}</DataTable.Cell>
            <DataTable.Cell>{item.status}</DataTable.Cell>
            <DataTable.Cell>
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="pencil"
                  onPress={() => handleMarketItemAction(item.id, 'edit')}
                />
                <IconButton
                  icon="delete"
                  onPress={() => handleMarketItemAction(item.id, 'delete')}
                />
                {item.status === 'active' && (
                  <IconButton
                    icon="check-circle"
                    onPress={() => handleMarketItemAction(item.id, 'mark-sold')}
                  />
                )}
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={{ padding: 16 }}>
      <Surface style={{ padding: 16, marginBottom: 16 }}>
        <Text variant="titleMedium">System Settings</Text>
        {/* Add system settings controls here */}
      </Surface>

      <Surface style={{ padding: 16 }}>
        <Text variant="titleMedium">Analytics</Text>
        {/* Add analytics dashboard here */}
      </Surface>
    </View>
  );

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: 16 }}>
        <Text variant="headlineMedium">Admin Dashboard</Text>
      </View>

      <SegmentedButtons
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
        buttons={[
          { value: 'users', label: 'Users' },
          { value: 'noticeboard', label: 'Notices' },
          { value: 'marketplace', label: 'Market' },
          { value: 'reports', label: 'Reports' },
          { value: 'settings', label: 'Settings' },
        ]}
        style={{ margin: 16 }}
      />

      <ScrollView>
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'reports' && renderReportsTab()}
        {activeTab === 'noticeboard' && renderNoticeboardTab()}
        {activeTab === 'marketplace' && renderMarketplaceTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </ScrollView>
    </SafeAreaView>
  );
} 