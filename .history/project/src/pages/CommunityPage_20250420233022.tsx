import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import Container from '../components/ui/Container';
import ForumPostCard from '../components/ForumPostCard';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { forumPosts, getRecentPosts, getMostEngagedPosts } from '../data/forumPosts';
import { v4 as uuidv4 } from 'uuid';

const CommunityPage: React.FC = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postFilter, setPostFilter] = useState<'recent' | 'popular'>('recent');
  
  const displayedPosts = postFilter === 'recent' 
    ? getRecentPosts() 
    : getMostEngagedPosts();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the post to a backend
    console.log('New post:', { title: postTitle, content: postContent });
    setPostTitle('');
    setPostContent('');
    alert('Post submitted! In a real app, this would be added to the forum.');
  };
  
  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-gray-600">
            Connect with others, share experiences, and find support in our community forum.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-md ${
                    postFilter === 'recent' 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setPostFilter('recent')}
                >
                  Recent
                </button>
                <button
                  className={`px-3 py-1 rounded-md ${
                    postFilter === 'popular' 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setPostFilter('popular')}
                >
                  Most Popular
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {displayedPosts.map((post) => (
                <ForumPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Create a Post</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      id="post-title"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter a title for your post"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      id="post-content"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={6}
                      placeholder="Share your thoughts, experiences, or questions..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    fullWidth
                    icon={<Send size={16} />}
                  >
                    Post to Forum
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-purple-50 border border-purple-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Community Guidelines</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Be respectful and supportive of others
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Keep posts related to mental health and wellbeing
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Do not share personal identifying information
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  If someone appears to be in crisis, encourage them to seek professional help
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CommunityPage;