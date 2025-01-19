import { Comment } from "@/types";

export const mockPosts = [
    {
      id: '1',
      author: {
        id: 'user1',
        username: 'JohnDoe',
        avatar: 'https://picsum.photos/200',
      },
      community: {
        id: 'tech',
        name: 'Technology',
        icon: 'https://picsum.photos/100',
      },
      content: {
        title: 'Check out this new feature!',
        text: 'Just released a new update with amazing features that will blow your mind. Let me know what you think about it!',
        image: 'https://picsum.photos/800/400',
      },
      stats: {
        upvotes: 42,
        comments: 12,
        timeAgo: '2h ago',
      },
    },
    {
      id: '2',
      author: {
        id: 'user2',
        username: 'JaneSmith',
      },
      community: {
        id: 'design',
        name: 'Design',
      },
      content: {
        title: 'Design inspiration for your next project',
        text: 'Found these amazing design resources that might help you with your next project. Sharing is caring!',
      },
      stats: {
        upvotes: 128,
        comments: 24,
        timeAgo: '4h ago',
      },
    },
    
  ];
  

  export const mockComments: Comment[] = [
    {
      id: '1',
      author: {
        username: 'JohnDoe',
        avatar: 'https://picsum.photos/200',
      },
      content: 'This is amazing! Thanks for sharing.',
      timeAgo: '1h ago',
      likes: 5,
    },
    {
      id: '2',
      author: {
        username: 'JaneSmith',
      },
      content: 'Really helpful information, looking forward to more content like this!',
      timeAgo: '2h ago',
      likes: 3,
    },
  ];