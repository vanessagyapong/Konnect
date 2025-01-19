import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface Author {
  id: string;
  username: string;
  avatar?: string;
  role: 'student' | 'professor' | 'admin' | 'staff';
}

export interface Community {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export interface PostContent {
  title: string;
  text: string;
  image?: string;
  isPinned?: boolean;
  isImportant?: boolean;
}

export interface PostStats {
  upvotes: number;
  comments: number;
  timeAgo: string;
}

export interface Comment {
  id: string;
  author: Author;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: Author;
  community: Community;
  content: PostContent;
  stats: PostStats;
  timestamp: string;
  likes: number;
  comments: Comment[];
}