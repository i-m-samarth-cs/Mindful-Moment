import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Container from '../components/ui/Container';
import ExerciseCard from '../components/ExerciseCard';
import { exercises } from '../data/exercises';

const ExercisesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = 
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDuration = selectedDuration === null || exercise.duration <= selectedDuration;
    
    return matchesSearch && matchesDuration;
  });
  
  const durations = [
    { value: 5, label: '5 minutes or less' },
    { value: 10, label: '10 minutes or less' },
    { value: null, label: 'Any duration' },
  ];
  
  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mindfulness Exercises</h1>
          <p className="text-gray-600">
            Discover exercises and techniques to help manage stress, anxiety, and improve your mental wellbeing.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex-shrink-0">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedDuration === null ? '' : selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value === '' ? null : Number(e.target.value))}
              >
                <option value="">Any duration</option>
                <option value="5">5 minutes or less</option>
                <option value="10">10 minutes or less</option>
              </select>
            </div>
          </div>
        </div>
        
        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              No exercises found matching your criteria. Try adjusting your search.
            </p>
          </div>
        )}
        
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Benefits of Regular Mindfulness Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700 mb-2">Reduced Stress</h3>
              <p className="text-gray-600">
                Regular mindfulness practice can lower cortisol levels and help manage stress responses.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700 mb-2">Improved Focus</h3>
              <p className="text-gray-600">
                Mindfulness strengthens attention and concentration for better performance.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700 mb-2">Better Emotional Regulation</h3>
              <p className="text-gray-600">
                Practice helps recognize and manage difficult emotions more effectively.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-blue-700 mb-2">Enhanced Self-Awareness</h3>
              <p className="text-gray-600">
                Develop greater understanding of thoughts, feelings, and behaviors.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ExercisesPage;