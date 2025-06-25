export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: 'body' | 'social' | 'wealth' | 'mindset';
  tags: string[];
  imageUrl: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}