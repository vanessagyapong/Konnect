export interface Comment {
    id: string;
    author: {
      username: string;
      avatar?: string;
    };
    content: string;
    timeAgo: string;
    likes: number;
  }