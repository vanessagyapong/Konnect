export interface Post {
  id: string;
  communityId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  images?: string[];
  likes: string[]; // Array of user IDs who liked the post
  commentCount: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: string[]; // Array of user IDs who liked the comment
  createdAt: Date;
}

export interface CommunityMember {
  userId: string;
  joinedAt: Date;
  role: 'member' | 'moderator' | 'admin';
}

export interface Community {
  id: string;
  name: string;
  description: string;
  type: 'department' | 'research' | 'officeHours' | 'alumni';
  members: CommunityMember[];
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
} 