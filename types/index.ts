export interface BlogPost {
  id: string;
  title: string;
  author: string;
  readTime: string;
  image: string;
  category?: string;
  authorAvatar: string;
  featured?: boolean;
}

export interface FeaturedPost {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  image: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  readTime: string;
  image: string;
  description?: string;
  content: string;
  category?: string;
  date?: string;
}

export interface FeaturedPost {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}
