import React from 'react';
import { MoodEntry } from '../types';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import { getDayName, getLastSevenDays, isSameDay } from '../utils/dates';

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries }) => {
  const lastSevenDays = getLastSevenDays();
  
  const getMoodIconByType = (mood: MoodEntry['mood']) => {
    switch (mood) {
      case 'terrible':
        return <ThumbsDown size={20} className="text-red-500" />;
      case 'bad':
        return <Frown size={20} className="text-orange-500" />;
      case 'neutral':
        return <Meh size={20} className="text-yellow-500" />;
      case 'good':
        return <Smile size={20} className="text-green-500" />;
      case 'great':
        return <ThumbsUp size={20} className="text-blue-500" />;
    }
  };
  
  const getMoodForDay = (day: Date): MoodEntry | undefined => {
    return entries.find(entry => {
      const entryDate = new Date(entry.date);
      return isSameDay(entryDate, day);
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Mood History</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          {lastSevenDays.map((day, index) => {
            const mood = getMoodForDay(day);
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  {getDayName(day)}
                </div>
                
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200">
                  {mood ? (
                    getMoodIconByType(mood.mood)
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-medium mb-3">Insights</h4>
          {entries.length > 0 ? (
            <p className="text-gray-600">
              You've tracked your mood {entries.length} time{entries.length !== 1 && 's'} in the past week. 
              Keep it up to gain more insights about your patterns!
            </p>
          ) : (
            <p className="text-gray-600">
              You haven't tracked any moods yet. Start logging your daily mood to see patterns over time.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodHistory;