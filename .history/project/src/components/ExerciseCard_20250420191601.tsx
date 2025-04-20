import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Exercise } from '../types';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{exercise.title}</CardTitle>
          <div className="flex items-center text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-sm">
            <Clock size={14} className="mr-1" />
            <span>{exercise.duration} min</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{exercise.description}</p>
        
        {expanded && (
          <>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Steps:</h4>
              <ol className="list-decimal list-inside text-gray-600 space-y-1">
                {exercise.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Benefits:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="mr-2"
          icon={expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
        
        <Button size="sm">Start Exercise</Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;