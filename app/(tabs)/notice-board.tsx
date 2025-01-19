import { View, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { sharedStyles } from '@/theme/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '@/theme';
import { Text, Card, Searchbar, Chip, List, Badge, IconButton, Button, Menu, ProgressBar, Surface, FAB } from 'react-native-paper';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for different notice categories
const mockDeadlines = [
  {
    id: '1',
    course: 'CS101',
    title: 'Final Project Submission',
    dueDate: '2024-03-20T23:59:00',
    description: 'Submit your final project including documentation',
    priority: 'high',
    type: 'assignment',
    attachments: ['project_guidelines.pdf'],
    submissionLink: 'https://canvas.university.edu/cs101/final'
  },
  {
    id: '2',
    course: 'MATH201',
    title: 'Problem Set 5',
    dueDate: '2024-03-15T23:59:00',
    description: 'Complete problems 1-10 from Chapter 7',
    priority: 'medium',
    type: 'homework',
    attachments: ['chapter7_problems.pdf']
  },
  {
    id: '3',
    course: 'PHYS102',
    title: 'Lab Report: Wave Motion',
    dueDate: '2024-03-18T17:00:00',
    description: 'Submit detailed lab report with analysis and conclusions',
    priority: 'high',
    type: 'lab',
    attachments: ['lab_template.docx', 'data_sheet.xlsx']
  },
  {
    id: '4',
    course: 'ENG205',
    title: 'Research Paper Draft',
    dueDate: '2024-03-25T23:59:00',
    description: 'Submit first draft of research paper (min. 2000 words)',
    priority: 'medium',
    type: 'paper',
    attachments: ['research_guidelines.pdf']
  }
];

const mockEvents = [
  {
    id: '1',
    title: 'Career Fair',
    date: '2024-03-18T10:00:00',
    endDate: '2024-03-18T16:00:00',
    location: 'Student Center',
    description: 'Annual spring career fair with 50+ companies',
    category: 'career',
    organizer: 'Career Services',
    registration: true,
    capacity: 500,
    attendees: 324,
    virtual: false,
    companies: ['Google', 'Microsoft', 'Apple', 'Meta']
  },
  {
    id: '2',
    title: 'Guest Lecture: AI Ethics',
    date: '2024-03-16T14:00:00',
    endDate: '2024-03-16T15:30:00',
    location: 'Auditorium A',
    description: 'Distinguished speaker series',
    category: 'academic',
    organizer: 'Computer Science Department',
    speaker: 'Dr. Jane Smith',
    registration: false,
    virtual: true,
    zoomLink: 'https://zoom.us/j/123456789'
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    date: '2024-03-22T09:00:00',
    endDate: '2024-03-22T17:00:00',
    location: 'University Gym',
    description: 'Inter-department basketball tournament',
    category: 'sports',
    organizer: 'Sports Committee',
    registration: true,
    teamSize: 5,
    teamsRegistered: 8,
    maxTeams: 16
  },
  {
    id: '4',
    title: 'Club Fair',
    date: '2024-03-19T11:00:00',
    endDate: '2024-03-19T15:00:00',
    location: 'Main Quad',
    description: 'Explore and join student clubs',
    category: 'social',
    organizer: 'Student Affairs',
    registration: false,
    participating_clubs: 45
  },
  {
    id: '5',
    title: 'Research Symposium',
    date: '2024-03-24T13:00:00',
    endDate: '2024-03-24T17:00:00',
    location: 'Science Building',
    description: 'Undergraduate research presentations',
    category: 'academic',
    organizer: 'Research Office',
    registration: true,
    presenters: 25,
    posterSessions: true
  }
];

const mockAlerts = [
  {
    id: '1',
    title: 'Campus Maintenance',
    message: 'Library will be closed for renovations this weekend',
    severity: 'info',
    date: '2024-03-14T09:00:00',
    affectedAreas: ['Main Library'],
    duration: '48h',
    alternativeServices: ['Online Resources Available', 'Study Rooms in Student Center']
  },
  {
    id: '2',
    title: 'Weather Advisory',
    message: 'Classes may be conducted online due to expected snowstorm',
    severity: 'warning',
    date: '2024-03-15T08:00:00',
    affectedServices: ['In-person Classes', 'Campus Shuttle'],
    updates: ['8:00 AM - Initial Advisory', '12:00 PM - Status Update Expected']
  },
  {
    id: '3',
    title: 'IT System Maintenance',
    message: 'Student portal will be down for scheduled maintenance',
    severity: 'info',
    date: '2024-03-17T22:00:00',
    duration: '4h',
    affectedServices: ['Student Portal', 'Online Registration'],
    alternativeServices: ['Email Support Available']
  },
  {
    id: '4',
    title: 'Health Advisory',
    message: 'Increased flu cases reported on campus',
    severity: 'warning',
    date: '2024-03-16T10:00:00',
    recommendations: ['Wear Masks', 'Use Hand Sanitizer'],
    resources: ['Health Center', 'Telehealth Services']
  }
];

const mockAnnouncements = [
  {
    id: '1',
    course: 'CS101',
    professor: 'Dr. Smith',
    title: 'Project Guidelines Update',
    message: 'Updated requirements for final project posted',
    date: '2024-03-13T15:30:00',
    type: 'project',
    attachments: ['updated_guidelines.pdf'],
    importance: 'high'
  },
  {
    id: '2',
    course: 'MATH201',
    professor: 'Prof. Johnson',
    title: 'Extra Office Hours',
    message: 'Additional office hours available before midterm',
    date: '2024-03-14T11:00:00',
    type: 'office_hours',
    location: 'Room 302',
    slots: ['2:00 PM', '3:00 PM', '4:00 PM']
  },
  {
    id: '3',
    course: 'PHYS102',
    professor: 'Dr. Chen',
    title: 'Lab Safety Reminder',
    message: 'Review safety protocols before next lab session',
    date: '2024-03-15T09:00:00',
    type: 'lab',
    attachments: ['safety_guidelines.pdf'],
    importance: 'high'
  },
  {
    id: '4',
    course: 'ENG205',
    professor: 'Prof. Williams',
    title: 'Guest Speaker Next Week',
    message: 'Renowned author joining class discussion',
    date: '2024-03-16T14:00:00',
    type: 'event',
    speaker: 'Jane Doe',
    virtual: true,
    zoomLink: 'https://zoom.us/j/987654321'
  },
  {
    id: '5',
    course: 'CS101',
    professor: 'Dr. Smith',
    title: 'Midterm Results Posted',
    message: 'Review your results and schedule office hours if needed',
    date: '2024-03-17T16:00:00',
    type: 'grades',
    attachments: ['study_guide.pdf'],
    averageScore: 85
  }
];

type Category = 'deadlines' | 'events' | 'alerts' | 'announcements' | 'all';
type DateFilter = 'today' | 'week' | 'month' | 'all';
type Priority = 'high' | 'medium' | 'low' | 'all';
type EventType = 'academic' | 'social' | 'career' | 'sports' | 'all';

export default function NoticeBoardScreen() {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority>('all');
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType>('all');
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isWithinDateFilter = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (dateFilter) {
      case 'today':
        return diffDays === 0;
      case 'week':
        return diffDays <= 7;
      case 'month':
        return diffDays <= 30;
      default:
        return true;
    }
  };

  const handleNoticeAction = async (noticeId: string, action: 'edit' | 'delete' | 'pin') => {
    // TODO: Implement notice actions
    console.log(`${action} notice ${noticeId}`);
    setMenuVisible(false);
  };

  return (
    <SafeAreaView style={[sharedStyles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
            <Text variant="headlineMedium">Notice Board</Text>
            <Menu
              visible={filterMenuVisible}
              onDismiss={() => setFilterMenuVisible(false)}
              anchor={
                <IconButton
                  icon="tune"
                  onPress={() => setFilterMenuVisible(true)}
                />
              }
            >
              <Menu.Item 
                title="Time Range"
                leadingIcon="clock-outline"
              />
              <Menu.Item
                title="Today"
                onPress={() => {
                  setDateFilter('today');
                  setFilterMenuVisible(false);
                }}
              />
              <Menu.Item
                title="This Week"
                onPress={() => {
                  setDateFilter('week');
                  setFilterMenuVisible(false);
                }}
              />
              <Menu.Item
                title="This Month"
                onPress={() => {
                  setDateFilter('month');
                  setFilterMenuVisible(false);
                }}
              />
              <Menu.Item
                title="All Time"
                onPress={() => {
                  setDateFilter('all');
                  setFilterMenuVisible(false);
                }}
              />
            </Menu>
          </View>
          
          <Searchbar
            placeholder="Search notices..."
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
              style={{ marginRight: spacing.xs }}
            >
              All
            </Chip>
            <Chip
              selected={selectedCategory === 'deadlines'}
              onPress={() => setSelectedCategory('deadlines')}
              style={{ marginRight: spacing.xs }}
              icon="calendar-clock"
            >
              Deadlines
            </Chip>
            <Chip
              selected={selectedCategory === 'events'}
              onPress={() => setSelectedCategory('events')}
              style={{ marginRight: spacing.xs }}
              icon="calendar"
            >
              Events
            </Chip>
            <Chip
              selected={selectedCategory === 'alerts'}
              onPress={() => setSelectedCategory('alerts')}
              style={{ marginRight: spacing.xs }}
              icon="alert"
            >
              Alerts
            </Chip>
            <Chip
              selected={selectedCategory === 'announcements'}
              onPress={() => setSelectedCategory('announcements')}
              style={{ marginRight: spacing.xs }}
              icon="bullhorn"
            >
              Announcements
            </Chip>
          </ScrollView>

          {/* Event Type Filter (shown only when Events category is selected) */}
          {selectedCategory === 'events' && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: spacing.md }}
            >
              <Chip
                selected={eventTypeFilter === 'all'}
                onPress={() => setEventTypeFilter('all')}
                style={{ marginRight: spacing.xs }}
              >
                All Events
              </Chip>
              <Chip
                selected={eventTypeFilter === 'academic'}
                onPress={() => setEventTypeFilter('academic')}
                style={{ marginRight: spacing.xs }}
                icon="school"
              >
                Academic
              </Chip>
              <Chip
                selected={eventTypeFilter === 'social'}
                onPress={() => setEventTypeFilter('social')}
                style={{ marginRight: spacing.xs }}
                icon="account-group"
              >
                Social
              </Chip>
              <Chip
                selected={eventTypeFilter === 'career'}
                onPress={() => setEventTypeFilter('career')}
                style={{ marginRight: spacing.xs }}
                icon="briefcase"
              >
                Career
              </Chip>
              <Chip
                selected={eventTypeFilter === 'sports'}
                onPress={() => setEventTypeFilter('sports')}
                style={{ marginRight: spacing.xs }}
                icon="basketball"
              >
                Sports
              </Chip>
            </ScrollView>
          )}

          {/* Upcoming Deadlines */}
          {(selectedCategory === 'all' || selectedCategory === 'deadlines') && (
            <Card style={{ marginBottom: spacing.md }}>
              <Card.Title
                title="Upcoming Deadlines"
                subtitle={`${dateFilter === 'all' ? 'All' : dateFilter === 'today' ? 'Today' : 
                          dateFilter === 'week' ? 'This Week' : 'This Month'}`}
                left={props => <MaterialCommunityIcons name="calendar-clock" size={24} color={theme.colors.primary} />}
                right={props => (
                  <IconButton
                    icon="bell-outline"
                    onPress={() => console.log('Subscribe to deadlines')}
                  />
                )}
              />
              <Card.Content>
                {mockDeadlines
                  .filter(deadline => isWithinDateFilter(deadline.dueDate))
                  .map(deadline => (
                    <List.Item
                      key={deadline.id}
                      title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{deadline.title}</Text>
                          {getDaysUntil(deadline.dueDate) <= 2 && (
                            <Badge
                              style={{
                                backgroundColor: theme.colors.error,
                                marginLeft: spacing.xs
                              }}
                            >
                              Urgent
                            </Badge>
                          )}
                        </View>
                      }
                      description={
                        <View>
                          <Text>{`${deadline.course} • Due ${formatDate(deadline.dueDate)}`}</Text>
                          <ProgressBar
                            progress={Math.max(0, Math.min(1, 1 - getDaysUntil(deadline.dueDate) / 14))}
                            color={getDaysUntil(deadline.dueDate) <= 2 ? theme.colors.error :
                                  getDaysUntil(deadline.dueDate) <= 5 ? theme.colors.tertiary :
                                  theme.colors.primary}
                            style={{ marginTop: spacing.xs }}
                          />
                        </View>
                      }
                      left={props => (
                        <Badge
                          style={{
                            backgroundColor: getDaysUntil(deadline.dueDate) <= 2 ? theme.colors.error :
                                          getDaysUntil(deadline.dueDate) <= 5 ? theme.colors.tertiary :
                                          theme.colors.primary,
                            alignSelf: 'center'
                          }}
                        >
                          {`${getDaysUntil(deadline.dueDate)}d`}
                        </Badge>
                      )}
                      right={props => (
                        <View style={{ flexDirection: 'row' }}>
                          <IconButton icon="calendar-plus" onPress={() => console.log('Add to calendar')} />
                          <IconButton icon="chevron-right" />
                        </View>
                      )}
                    />
                  ))}
                <Button
                  mode="outlined"
                  onPress={() => console.log('View all deadlines')}
                  style={{ marginTop: spacing.sm }}
                >
                  View All Deadlines
                </Button>
              </Card.Content>
            </Card>
          )}

          {/* Campus Events */}
          {(selectedCategory === 'all' || selectedCategory === 'events') && (
            <Card style={{ marginBottom: spacing.md }}>
              <Card.Title
                title="Campus Events"
                subtitle={`${eventTypeFilter === 'all' ? 'All Types' : eventTypeFilter.charAt(0).toUpperCase() + eventTypeFilter.slice(1)}`}
                left={props => <MaterialCommunityIcons name="calendar" size={24} color={theme.colors.primary} />}
                right={props => (
                  <IconButton
                    icon="bell-outline"
                    onPress={() => console.log('Subscribe to events')}
                  />
                )}
              />
              <Card.Content>
                {mockEvents
                  .filter(event => isWithinDateFilter(event.date))
                  .filter(event => eventTypeFilter === 'all' || event.category === eventTypeFilter)
                  .map(event => (
                    <List.Item
                      key={event.id}
                      title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{event.title}</Text>
                          {new Date(event.date).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000 && (
                            <Badge
                              style={{
                                backgroundColor: theme.colors.primary,
                                marginLeft: spacing.xs
                              }}
                            >
                              Today
                            </Badge>
                          )}
                        </View>
                      }
                      description={`${formatDate(event.date)} • ${event.location}`}
                      left={props => (
                        <MaterialCommunityIcons
                          name={event.category === 'career' ? 'briefcase' : 'school'}
                          size={24}
                          color={theme.colors.primary}
                          style={{ alignSelf: 'center' }}
                        />
                      )}
                      right={props => (
                        <View style={{ flexDirection: 'row' }}>
                          <IconButton icon="calendar-plus" onPress={() => console.log('Add to calendar')} />
                          <IconButton icon="share-variant" onPress={() => console.log('Share event')} />
                          <IconButton icon="chevron-right" />
                        </View>
                      )}
                    />
                  ))}
                <Button
                  mode="outlined"
                  onPress={() => console.log('View all events')}
                  style={{ marginTop: spacing.sm }}
                >
                  View All Events
                </Button>
              </Card.Content>
            </Card>
          )}

          {/* Campus Alerts */}
          {(selectedCategory === 'all' || selectedCategory === 'alerts') && (
            <Card style={{ marginBottom: spacing.md }}>
              <Card.Title
                title="Campus Alerts"
                left={props => <MaterialCommunityIcons name="alert" size={24} color={theme.colors.primary} />}
              />
              <Card.Content>
                {mockAlerts.map(alert => (
                  <List.Item
                    key={alert.id}
                    title={alert.title}
                    description={alert.message}
                    left={props => (
                      <MaterialCommunityIcons
                        name={alert.severity === 'warning' ? 'alert' : 'information'}
                        size={24}
                        color={alert.severity === 'warning' ? theme.colors.error : theme.colors.primary}
                        style={{ alignSelf: 'center' }}
                      />
                    )}
                    right={props => <Text>{formatDate(alert.date)}</Text>}
                  />
                ))}
              </Card.Content>
            </Card>
          )}

          {/* Professor Announcements */}
          {(selectedCategory === 'all' || selectedCategory === 'announcements') && (
            <Card style={{ marginBottom: spacing.md }}>
              <Card.Title
                title="Professor Announcements"
                left={props => <MaterialCommunityIcons name="bullhorn" size={24} color={theme.colors.primary} />}
                right={props => (
                  <IconButton
                    icon="bell-outline"
                    onPress={() => console.log('Subscribe to announcements')}
                  />
                )}
              />
              <Card.Content>
                {mockAnnouncements
                  .filter(announcement => isWithinDateFilter(announcement.date))
                  .map(announcement => (
                    <List.Item
                      key={announcement.id}
                      title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{announcement.title}</Text>
                          {new Date(announcement.date).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000 && (
                            <Badge
                              style={{
                                backgroundColor: theme.colors.primary,
                                marginLeft: spacing.xs
                              }}
                            >
                              New
                            </Badge>
                          )}
                        </View>
                      }
                      description={`${announcement.course} • ${announcement.professor}`}
                      left={props => (
                        <MaterialCommunityIcons
                          name="account-tie"
                          size={24}
                          color={theme.colors.primary}
                          style={{ alignSelf: 'center' }}
                        />
                      )}
                      right={props => (
                        <View style={{ flexDirection: 'row' }}>
                          <IconButton icon="share-variant" onPress={() => console.log('Share announcement')} />
                          <IconButton icon="chevron-right" />
                        </View>
                      )}
                    />
                  ))}
                <Button
                  mode="outlined"
                  onPress={() => console.log('View all announcements')}
                  style={{ marginTop: spacing.sm }}
                >
                  View All Announcements
                </Button>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

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
            // TODO: Implement new notice creation
            console.log('Create new notice');
          }}
        />
      )}
    </SafeAreaView>
  );
} 