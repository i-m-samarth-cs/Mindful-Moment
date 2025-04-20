import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: '4-7-8 Breathing',
    description: 'A breathing pattern that can help reduce anxiety and help you get to sleep.',
    duration: 2,
    steps: [
      'Sit comfortably and close your eyes',
      'Inhale through your nose for 4 seconds',
      'Hold your breath for 7 seconds',
      'Exhale completely through your mouth for 8 seconds',
      'Repeat for at least 4 cycles'
    ],
    benefits: ['Reduces anxiety', 'Helps fall asleep', 'Manages cravings', 'Helps control anger responses']
  },
  {
    id: '2',
    title: 'Body Scan Meditation',
    description: 'A meditation focused on sensing different parts of your body.',
    duration: 5,
    steps: [
      'Lie down on your back with palms facing up',
      'Take deep breaths and close your eyes',
      'Focus on your feet, noticing any sensations',
      'Gradually move attention up your body to your head',
      'Notice areas of tension and try to release them',
      'When complete, take a moment to feel your whole body'
    ],
    benefits: ['Reduces physical tension', 'Increases body awareness', 'Promotes relaxation']
  },
  {
    id: '3',
    title: 'Grounding 5-4-3-2-1',
    description: 'A technique to help manage overwhelming feelings by connecting with your senses.',
    duration: 3,
    steps: [
      'Name 5 things you can see',
      'Name 4 things you can touch/feel',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste'
    ],
    benefits: ['Manages overwhelming emotions', 'Helps during panic attacks', 'Brings you to the present moment']
  },
  {
    id: '4',
    title: 'Mindful Walking',
    description: 'A walking meditation that brings awareness to movement.',
    duration: 10,
    steps: [
      'Find a quiet place to walk slowly',
      'Focus on each step, the lifting, moving, and placing of your foot',
      'Notice the sensations in your feet and legs',
      'When your mind wanders, gently bring it back to your walking',
      'Continue for 10 minutes or longer'
    ],
    benefits: ['Combines physical activity with mindfulness', 'Can be done anywhere', 'Improves focus']
  },
  {
    id: '5',
    title: 'Gratitude Practice',
    description: 'Taking time to reflect on things you\'re grateful for.',
    duration: 5,
    steps: [
      'Find a quiet place to sit',
      'Take a few deep breaths',
      'Think of 3 things you\'re grateful for today',
      'For each item, spend a moment really feeling the gratitude',
      'Write these down if possible'
    ],
    benefits: ['Shifts focus from negative to positive', 'Improves mood', 'Builds resilience']
  }
];

export const getQuickExercises = (): Exercise[] => {
  return exercises.filter(exercise => exercise.duration <= 5);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};