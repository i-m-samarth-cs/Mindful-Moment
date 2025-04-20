import { ForumPost } from '../types';

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'How do you handle work anxiety?',
    content: 'I\'ve been struggling with anxiety about deadlines and presentations at work. What strategies have helped you manage work-related stress?',
    date: '2023-10-12T14:30:00Z',
    likes: 24,
    replies: 12
  },
  {
    id: '2',
    title: 'Finding motivation during depression',
    content: 'Depression has made it hard to find motivation for even basic tasks. Anyone have tips for getting through these periods?',
    date: '2023-10-10T09:15:00Z',
    likes: 35,
    replies: 18
  },
  {
    id: '3',
    title: 'Meditation practice accountability',
    content: 'Looking for buddies to help stay accountable with daily meditation practice. Anyone interested in checking in with each other?',
    date: '2023-10-08T16:45:00Z',
    likes: 12,
    replies: 7
  },
  {
    id: '4',
    title: 'Sleep hygiene suggestions',
    content: 'I\'ve been having trouble sleeping lately. What changes to your sleep routine have made the biggest difference?',
    date: '2023-10-05T20:00:00Z',
    likes: 29,
    replies: 15
  },
  {
    id: '5',
    title: 'First therapy session nerves',
    content: 'I finally scheduled my first therapy appointment, but I\'m really nervous. What should I expect, and do you have advice for making the most of it?',
    date: '2023-10-03T11:20:00Z',
    likes: 42,
    replies: 22
  }
];

export const getRecentPosts = (): ForumPost[] => {
  return [...forumPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const getMostEngagedPosts = (): ForumPost[] => {
  return [...forumPosts].sort((a, b) => {
    const aEngagement = a.likes + a.replies;
    const bEngagement = b.likes + b.replies;
    return bEngagement - aEngagement;
  });
};