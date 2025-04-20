import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ForumPostCard from './ForumPostCard';
import ForumTabs from './ForumTabs';
import { getRecentPosts, getTopPosts, getMostCommentedPosts } from './forumPosts';

const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postFilter, setPostFilter] = useState<'recent' | 'top' | 'mostCommented'>('recent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      id: uuidv4(),
      title: postTitle,
      content: postContent,
      date: new Date().toISOString(),
      comments: [],
      likes: 0,
    };

    // Add new post to top
    setPosts(prevPosts => [newPost, ...prevPosts]);

    // Reset form fields
    setPostTitle('');
    setPostContent('');

    // Switch to recent tab
    setPostFilter('recent');
  };

  const filteredPosts =
    postFilter === 'top'
      ? getTopPosts(posts)
      : postFilter === 'mostCommented'
      ? getMostCommentedPosts(posts)
      : getRecentPosts(posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Community Forum</h1>
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Start a Discussion</h2>
          <div className="mb-4">
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post to Forum
          </button>
        </form>
      </div>

      <ForumTabs currentFilter={postFilter} onFilterChange={setPostFilter} />

      <div className="mt-6 space-y-4">
        {filteredPosts.map(post => (
          <ForumPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
