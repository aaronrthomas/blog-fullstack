import React from 'react';
import { Metadata } from 'next';
import FeaturedSection from '@/components/FeaturedSection';
import RecentPosts from '@/components/RecentPosts';
import { BlogPost, FeaturedPost } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Beyond UI - SaaS Solutions & Design',
  description: 'Unlock business efficiency with innovative SaaS solutions and cutting-edge UI/UX design.',
};

async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
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
    
    const featuredPosts = posts.filter((post: BlogPost) => post.featured === true);
    const nonFeaturedPosts = posts.filter((post: BlogPost) => post.featured !== true);
    
    const featuredPost: FeaturedPost | null = featuredPosts.length > 0 ? {
      id: featuredPosts[0].id || '1',
      title: featuredPosts[0].title || 'Unlocking Business Efficiency with SaaS Solutions',
      description: featuredPosts[0].description || 'Discover how modern SaaS solutions can transform your business operations and drive growth.',
      image: featuredPosts[0].image || '/api/placeholder/800/400',
      category: featuredPosts[0].category || 'Business',
      featured: true
    } : null;
    
    const otherFeaturedPosts = featuredPosts.slice(1).map((post: { id: string; title: string; description: string; image: string; featured: boolean; }) => ({
      id: post.id,
      title: post.title,
      description: post.description || '',
      image: post.image,
      featured: post.featured
    }));
    
    const recentPostsSource = nonFeaturedPosts.length >= 3 ? nonFeaturedPosts : posts;
    const recentPosts: BlogPost[] = recentPostsSource.slice(0, 3).map((post: { id: string; title: string; description: string; author: string; readTime: string; image: string; authorAvatar: string; featured: boolean; }) => ({
      id: post.id || '',
      title: post.title || '',
      description: post.description || '',
      author: post.author || 'Unknown Author',
      readTime: post.readTime || '3 min read',
      image: post.image,
      authorAvatar: post.authorAvatar,
      featured: post.featured
    }));
    
    return {
      featuredPost,
      otherFeaturedPosts,
      recentPosts
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return {
      featuredPost: null,
      otherFeaturedPosts: [],
      recentPosts: []
    };
  }
}

export default async function Home() {
  const { featuredPost, otherFeaturedPosts, recentPosts } = await getData();

  const defaultFeaturedPost: FeaturedPost = {
    id: '1',
    title: 'Unlocking Business Efficiency with SaaS Solutions',
    description: 'Discover how modern SaaS solutions can transform your business operations and drive growth.',
    image: '/api/placeholder/800/400',
    category: 'Business',
    featured: true
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <FeaturedSection 
          featuredPost={featuredPost || defaultFeaturedPost}
          otherPosts={otherFeaturedPosts}
        />
        
        <RecentPosts posts={recentPosts} />
      </main>
    </div>
  );
}