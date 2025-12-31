"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedPost } from '../types';
import { capitalizeFirstLetter } from '@/utils/textUtils';

interface FeaturedSectionProps {
  featuredPost: FeaturedPost;
  otherPosts: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ featuredPost, otherPosts }) => {
  const [mainImageError, setMainImageError] = useState(false);
  const [smallImageErrors, setSmallImageErrors] = useState<{[key: number]: boolean}>({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-5 min-h-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
        <div className="lg:col-span-2">
          <Link href={`/posts/${featuredPost.id}`} className="block">
            <div className="relative h-[74vh] rounded-2xl overflow-hidden group cursor-pointer">
              {mainImageError ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <span>Image unavailable</span>
                </div>
              ) : (
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YyZjJmMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIHVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=="
                  onError={() => {
                    setMainImageError(true);
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm mb-3">
                  {featuredPost.category}
                </span>
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                  {capitalizeFirstLetter(featuredPost.title)}
                </h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-6 h-[74vh] flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Other featured posts</h3>
          <div className="overflow-y-auto flex-grow pr-2 
            [&::-webkit-scrollbar]:w-1.5 
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-200
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:transition-colors
            [&::-webkit-scrollbar-thumb]:duration-300">
            {otherPosts.map((post, index) => (
              <Link 
                href={`/posts/${post.id}`} 
                key={index} 
                className="flex space-x-4 group cursor-pointer mb-4 last:mb-0 pb-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden">
                  {smallImageErrors[index] ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                      <span>Image Unavailable</span>
                    </div>
                  ) : (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      onError={() => {
                        setSmallImageErrors(prev => ({ ...prev, [index]: true }));
                      }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {capitalizeFirstLetter(post.title)}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;