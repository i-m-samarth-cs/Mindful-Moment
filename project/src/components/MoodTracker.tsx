import React, { useState } from 'react';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';
import { MoodEntry } from '../types';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import { formatDate } from '../utils/dates';

interface MoodTrackerProps {
  onSaveMood: (entry: Omit<MoodEntry, 'id' | 'date'>) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onSaveMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [note, setNote] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMood) {
      onSaveMood({
        mood: selectedMood,
        note
      });
      
      // Reset form
      setSelectedMood(null);
      setNote('');
    }
  };
  
  const moodOptions: { value: MoodEntry['mood']; icon: React.ReactNode; label: string; color: string }[] = [
    { value: 'terrible', icon: <ThumbsDown size={24} />, label: 'Terrible', color: 'bg-red-100 text-red-600 border-red-200' },
    { value: 'bad', icon: <Frown size={24} />, label: 'Bad', color: 'bg-orange-100 text-orange-600 border-orange-200' },
    { value: 'neutral', icon: <Meh size={24} />, label: 'Neutral', color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
    { value: 'good', icon: <Smile size={24} />, label: 'Good', color: 'bg-green-100 text-green-600 border-green-200' },
    { value: 'great', icon: <ThumbsUp size={24} />, label: 'Great', color: 'bg-blue-100 text-blue-600 border-blue-200' }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <p className="text-gray-500">{formatDate(new Date())}</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2 justify-between mb-6">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedMood(option.value)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                  selectedMood === option.value 
                    ? `${option.color} border-current scale-105` 
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <span className="mb-1">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mb-4">
            <label htmlFor="mood-note" className="block text-sm font-medium text-gray-700 mb-1">
              Add a note (optional)
            </label>
            <textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="What's making you feel this way?"
            />
          </div>
          
          <Button
            type="submit"
            disabled={!selectedMood}
            fullWidth
          >
            Save My Mood
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;