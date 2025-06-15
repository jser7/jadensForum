import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/posts');
      const data = await response.json();
      setPosts(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-800 text-white">
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-700 rounded-lg shadow">
            <div className="text-gray-300 mb-4">
              <p>No posts yet. Be the first to create one!</p>
            </div>
            <Link 
              to="/create" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span className="font-medium">By {post.author}</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home; 