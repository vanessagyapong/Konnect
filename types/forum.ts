export interface ForumThread {
    id: string;
    title: string;
    author: {
      id: string;
      username: string;
    };
    lastPost: {
      timestamp: string;
      author: {
        id: string;
        username: string;
      };
    };
    repliesCount: number;
    viewsCount: number;
    isPinned: boolean;
    isLocked: boolean;
  }
  