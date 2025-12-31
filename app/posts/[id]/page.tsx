'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import PostImage from '@/components/PostImage';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { capitalizeFirstLetter } from '@/utils/textUtils';

const PostPage = () => {
  return (
    <ReactQueryProvider>
      <Post />
    </ReactQueryProvider>
  );
};

const Post = () => {
  const params = useParams();
  const postId = params.id as string;
  
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + `/${postId}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`);
      }
      
      const postData = await response.json();
      
      return {
        id: postData.id || postId,
        title: postData.title || 'Untitled Post',
        description: postData.description || '',
        image: postData.image || '/api/placeholder/800/400',
        category: postData.category || 'Uncategorized',
        content: postData.content || '<p>No content available.</p>',
        author: postData.author || 'Unknown Author',
        date: new Date(postData.date).toLocaleDateString() || new Date().toLocaleDateString(),
        readTime: postData.readTime || '3 min read',
        featured: postData.featured || false,
      };
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isError || !post) {
    return <div className="min-h-screen flex items-center justify-center">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex items-start gap-4">
        <div className="bg-white overflow-hidden shadow-md w-full">
          <div className="relative h-48 sm:h-64 md:h-80 w-full">
            <PostImage
              src={post.image}
              alt={post.title}
              priority
            />
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              <div className="flex flex-wrap items-center mb-2 sm:mb-0">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              {post.featured && (
                <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium self-start sm:self-auto">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {capitalizeFirstLetter(post.title)}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {post.category && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {post.category}
                </span>
              )}
            </div>

            <div className="prose prose-sm sm:prose max-w-none">
              {post.description && (
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">{post.description}</p>
              )}

              <div
                className="mt-4 sm:mt-8 text-gray-800 leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;