import React from 'react';
import { MessageSquare, Heart } from 'lucide-react';
import { ForumPost } from '../types';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { formatDate } from '../utils/dates';

interface ForumPostCardProps {
  post: ForumPost;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post }) => {
  return (
    <Card hover>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-gray-500">{formatDate(new Date(post.date))}</p>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700">{post.content}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500">
            <Heart size={16} className="mr-1" />
            <span>{post.likes}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <MessageSquare size={16} className="mr-1" />
            <span>{post.replies}</span>
          </div>
        </div>
        
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Read More
        </button>
      </CardFooter>
    </Card>
  );
};

export default ForumPostCard;