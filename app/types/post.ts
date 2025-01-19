export type Author = {
  id: string;
  username: string;
  avatar?: string;
}

export type Community = {
  id: string;
  name: string;
  icon: string;
}

export type PostContent = {
  title: string;
  text: string;
  image?: string;
  isImportant: boolean;
  isPinned: boolean;
}

export type PostStats = {
  upvotes: number;
  comments: number;
  saves: number;
}

export type Comment = {
  id: string;
  author: Author;
  text: string;
  timestamp: string;
}

export type Post = {
  id: string;
  author: Author;
  community: Community;
  content: PostContent;
  stats: PostStats;
  timestamp: string;
  likes: number;
  comments: Comment[];
} 