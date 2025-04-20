import { Resource } from '../types';

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 to connect with a Crisis Counselor. Free 24/7 support.',
    url: 'https://www.crisistextline.org/',
    category: 'crisis',
    tags: ['crisis', 'text', 'immediate']
  },
  {
    id: '2',
    title: 'National Suicide Prevention Lifeline',
    description: 'Call 988 for 24/7, free and confidential support.',
    url: 'https://988lifeline.org/',
    category: 'crisis',
    tags: ['crisis', 'suicide', 'hotline']
  },
  {
    id: '3',
    title: 'BetterHelp Online Therapy',
    description: 'Professional online therapy accessible anywhere.',
    url: 'https://www.betterhelp.com/',
    category: 'professional',
    tags: ['therapy', 'counseling', 'professional']
  },
  {
    id: '4',
    title: 'Headspace',
    description: 'Meditation and mindfulness made simple.',
    url: 'https://www.headspace.com/',
    category: 'self-help',
    tags: ['meditation', 'mindfulness', 'app']
  },
  {
    id: '5',
    title: 'Anxiety and Depression Association of America',
    description: 'Information, resources, and support for anxiety, depression, and related disorders.',
    url: 'https://adaa.org/',
    category: 'self-help',
    tags: ['anxiety', 'depression', 'resources']
  },
  {
    id: '6',
    title: 'Psychology Today Find a Therapist',
    description: 'Directory of therapists, psychiatrists, and treatment facilities.',
    url: 'https://www.psychologytoday.com/us/therapists',
    category: 'professional',
    tags: ['therapist', 'find help', 'directory']
  },
  {
    id: '7',
    title: 'Calm App',
    description: 'App for sleep, meditation and relaxation.',
    url: 'https://www.calm.com/',
    category: 'self-help',
    tags: ['sleep', 'meditation', 'app']
  },
  {
    id: '8',
    title: '7 Cups',
    description: 'Online therapy and free support chat.',
    url: 'https://www.7cups.com/',
    category: 'community',
    tags: ['support', 'chat', 'community']
  }
];

export const getCrisisResources = (): Resource[] => {
  return resources.filter(resource => resource.category === 'crisis');
};

export const getResourcesByCategory = (category: Resource['category']): Resource[] => {
  return resources.filter(resource => resource.category === category);
};

export const getResourcesByTag = (tag: string): Resource[] => {
  return resources.filter(resource => resource.tags.includes(tag));
};