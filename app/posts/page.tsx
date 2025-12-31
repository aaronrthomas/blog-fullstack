import React from 'react';
import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Posts - Beyond UI Blog',
  description: 'Browse all articles from the Beyond UI blog covering SaaS solutions, design, and technology.',
};

async function getAllPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.error('API_URL environment variable is not defined');
    return [];
  }
  
  try {
    const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const textData = await response.text();
    
    if (!textData) {
      console.error('Received empty response from API');
      throw new Error('Empty response received');
    }
    
    let posts;
    try {
      posts = JSON.parse(textData);
    } catch {
      throw new Error('Invalid JSON response');
    }
    
    return posts
      .map((post: BlogPost): BlogPost => ({
        id: post.id || '',
        title: post.title || '',
        description: post.description || '',
        author: post.author || 'Unknown Author',
        readTime: post.readTime || '3 min read',
        image: post.image || '/api/placeholder/400/300',
        content: post.content || '',
        authorAvatar: post.authorAvatar,
        featured: post.featured
      }))
      .filter((post: BlogPost) => post.featured === false);
    
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export default async function AllPosts() {
  const posts = await getAllPosts();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest articles, insights and thoughts about SaaS solutions, design and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.length > 0 ? (
            posts.map((post: BlogPost) => <BlogCard key={post.id} post={post} />)
          ) : (
            <div className="col-span-3 text-center py-8 sm:py-12 md:py-16">
              <p className="text-xl text-gray-500">No posts found. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
