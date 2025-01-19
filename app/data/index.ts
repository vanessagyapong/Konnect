import { Post } from '../types/post';

export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: 'prof1',
      username: 'Dr. Smith',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    community: {
      id: 'cs101',
      name: 'CS 101',
      icon: 'laptop',
    },
    content: {
      title: 'Midterm Exam Details',
      text: 'The midterm will cover chapters 1-5. Review session this Thursday.',
      isPinned: true,
      isImportant: true
    },
    stats: {
      upvotes: 45,
      comments: 12,
      saves: 30
    },
    timestamp: '2h ago',
    likes: 45,
    comments: []
  },
  {
    id: '2',
    author: {
      id: 'student1',
      username: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    community: {
      id: 'study',
      name: 'Study Groups',
      icon: 'account-group',
    },
    content: {
      title: 'Physics Study Group',
      text: 'Looking for study buddies for PHY201. Meeting at library every Tuesday.',
      isPinned: false,
      isImportant: false
    },
    stats: {
      upvotes: 15,
      comments: 8,
      saves: 5
    },
    timestamp: '4h ago',
    likes: 15,
    comments: []
  },
  {
    id: '3',
    author: {
      id: 'admin1',
      username: 'Campus Events',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    community: {
      id: 'events',
      name: 'Campus Events',
      icon: 'calendar',
    },
    content: {
      title: 'Spring Festival Next Week!',
      text: 'Join us for food, music, and fun activities. Free entry with student ID.',
      isPinned: true,
      isImportant: true
    },
    stats: {
      upvotes: 120,
      comments: 25,
      saves: 80
    },
    timestamp: '1d ago',
    likes: 120,
    comments: []
  },
  {
    id: '4',
    author: {
      id: 'club1',
      username: 'Engineering Club',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    community: {
      id: 'engineering',
      name: 'Engineering',
      icon: 'engine',
    },
    content: {
      title: 'Robotics Competition Registration',
      text: 'Register your team for the annual robotics competition. Deadline next Friday.',
      isPinned: false,
      isImportant: true
    },
    stats: {
      upvotes: 75,
      comments: 18,
      saves: 40
    },
    timestamp: '2d ago',
    likes: 75,
    comments: []
  },
  {
    id: '5',
    author: {
      id: 'housing',
      username: 'Housing Office',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    community: {
      id: 'housing',
      name: 'Housing',
      icon: 'home',
    },
    content: {
      title: 'Room Selection Process',
      text: 'Room selection for next semester starts next week. Check your time slot.',
      isPinned: true,
      isImportant: true
    },
    stats: {
      upvotes: 200,
      comments: 45,
      saves: 150
    },
    timestamp: '3d ago',
    likes: 200,
    comments: []
  },
  {
    title: "Assignment 3 Solutions Posted",
    text: "Solutions for Assignment 3 are now available on the course portal.",
    isImportant: false,
    isPinned: false
  },
  {
    title: "Basketball Tournament Signups",
    text: "Join our annual basketball tournament! Sign up at the gym.",
    isImportant: false,
    isPinned: false
  },
  {
    title: "Spring Festival Planning Meeting",
    text: "Planning meeting for Spring Festival this Friday at 3 PM.",
    isImportant: false,
    isPinned: false
  }
]; 