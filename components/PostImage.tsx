"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const PostImage: React.FC<PostImageProps> = ({ src, alt, priority = false }) => {
  const [imageError, setImageError] = useState(false);

  return imageError ? (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
      <span>Image unavailable</span>
    </div>
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority={priority}
      onError={() => {
        setImageError(true);
      }}
    />
  );
};

export default PostImage;