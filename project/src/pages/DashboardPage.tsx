import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from '../components/ui/Container';
import MoodTracker from '../components/MoodTracker';
import MoodHistory from '../components/MoodHistory';
import ExerciseCard from '../components/ExerciseCard';
import { MoodEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getQuickExercises } from '../data/exercises';

const DashboardPage: React.FC = () => {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('mindful-mood-entries', []);
  const [user, setUser] = useLocalStorage('mindful-user', {
    id: uuidv4(),
    preferences: {
      darkMode: false,
      reminders: false,
    },
    stats: {
      checkInStreak: 0,
      totalCheckIns: 0,
      lastCheckIn: null,
    }
  });
  
  const quickExercises = getQuickExercises();
  
  const handleSaveMood = (entry: Omit<MoodEntry, 'id' | 'date'>) => {
    const newEntry: MoodEntry = {
      id: uuidv4(),
      ...entry,
      date: new Date().toISOString(),
    };
    
    setMoodEntries([...moodEntries, newEntry]);
    
    // Update user stats
    const now = new Date();
    const lastCheckIn = user.stats.lastCheckIn ? new Date(user.stats.lastCheckIn) : null;
    const isNewDay = lastCheckIn ? 
      new Date(lastCheckIn).setHours(0, 0, 0, 0) !== new Date(now).setHours(0, 0, 0, 0) : 
      true;
      
    if (isNewDay) {
      // Check if the last check-in was yesterday to maintain streak
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = lastCheckIn ? 
        new Date(lastCheckIn).setHours(0, 0, 0, 0) === new Date(yesterday).setHours(0, 0, 0, 0) : 
        false;
        
      setUser({
        ...user,
        stats: {
          checkInStreak: wasYesterday ? user.stats.checkInStreak + 1 : 1,
          totalCheckIns: user.stats.totalCheckIns + 1,
          lastCheckIn: now.toISOString(),
        }
      });
    }
  };
  
  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Track your mood, view your progress, and find exercises to support your mental wellbeing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MoodTracker onSaveMood={handleSaveMood} />
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Current Streak</p>
                  <p className="text-3xl font-bold">{user.stats.checkInStreak} day{user.stats.checkInStreak !== 1 && 's'}</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                  <p className="text-sm text-purple-600 font-medium">Total Check-ins</p>
                  <p className="text-3xl font-bold">{user.stats.totalCheckIns}</p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Exercises Completed</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Quick Exercises</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickExercises.slice(0, 2).map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <MoodHistory entries={moodEntries} />
            
            <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Did You Know?</h3>
              <p className="text-gray-700 mb-4">
                Tracking your mood regularly can help you identify patterns and triggers, making it easier to manage your mental health.
              </p>
              <p className="text-gray-700">
                Mindfulness activities, even for just 5 minutes a day, can significantly reduce stress and anxiety levels.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;