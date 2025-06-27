import React from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { Translation } from '../types/translations';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  t: (key: keyof Translation) => string;
  isRTL: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, t, isRTL }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'body':
        return 'from-yellow-500 to-yellow-600';
      case 'social':
        return 'from-red-500 to-red-600';
      case 'wealth':
        return 'from-yellow-500 to-red-500';
      case 'mindset':
        return 'from-red-500 to-yellow-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBorder = (category: string) => {
    switch (category) {
      case 'body':
        return 'border-yellow-500/30 hover:border-yellow-500/50';
      case 'social':
        return 'border-red-500/30 hover:border-red-500/50';
      case 'wealth':
        return 'border-yellow-500/30 hover:border-yellow-500/50';
      case 'mindset':
        return 'border-red-500/30 hover:border-red-500/50';
      default:
        return 'border-gray-500/30 hover:border-gray-500/50';
    }
  };

  return (
    <article 
      className={`group bg-gray-900/50 border ${getCategoryBorder(post.category)} rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {post.featured && (
          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(post.category)}`}>
              Featured
            </span>
          </div>
        )}
        
        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src={post.authorImage} 
                alt={post.author}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{post.author}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} {t('minRead')}</span>
            </div>
          </div>
          
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <ArrowRight className={`h-5 w-5 text-gray-400 group-hover:text-yellow-400 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-all`} />
        </div>
      </div>
    </article>
  );
};