import React from 'react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import { BlogPost } from '../types';

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-8 md:-mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
        <Link href="/posts" className="bg-white text-black px-4 py-2 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm">
          All Posts
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post}  
          />
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
