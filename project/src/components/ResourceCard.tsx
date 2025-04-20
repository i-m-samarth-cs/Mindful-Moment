import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Resource } from '../types';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getCategoryBadgeColor = (category: Resource['category']) => {
    switch (category) {
      case 'crisis':
        return 'bg-red-100 text-red-800';
      case 'professional':
        return 'bg-purple-100 text-purple-800';
      case 'self-help':
        return 'bg-green-100 text-green-800';
      case 'community':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle>{resource.title}</CardTitle>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryBadgeColor(resource.category)}`}>
            {resource.category}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{resource.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {resource.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button 
            variant="outline" 
            fullWidth
            icon={<ExternalLink size={16} />}
          >
            Visit Resource
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;