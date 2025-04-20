export interface MoodEntry {
  id: string;
  mood: 'terrible' | 'bad' | 'neutral' | 'good' | 'great';
  note: string;
  date: string;
}

export interface User {
  id: string;
  preferences: {
    darkMode: boolean;
    reminders: boolean;
  };
  stats: {
    checkInStreak: number;
    totalCheckIns: number;
    lastCheckIn: string | null;
  };
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'crisis' | 'professional' | 'self-help' | 'community';
  tags: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  replies: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  steps: string[];
  benefits: string[];
}