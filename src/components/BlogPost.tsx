import React from 'react';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types/blog';
import { Translation } from '../types/translations';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
  t: (key: keyof Translation) => string;
  isRTL: boolean;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, onBack, t, isRTL }) => {
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

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold text-white mb-6 mt-8">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-yellow-400 mb-4 mt-6">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-red-400 mb-3 mt-4">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-300 mb-2 ml-4">{line.substring(2)}</li>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="text-white font-semibold mb-3">{line.substring(2, line.length - 2)}</p>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-300 mb-4 leading-relaxed">{line}</p>;
      }
    });
  };

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('backToBlog')}</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(post.category)} mb-4`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{post.author}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} {t('minRead')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
            {post.excerpt}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            {formatContent(post.content)}
          </div>
        </div>
        
        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400 font-medium">{t('tags')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-md transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
          <div className="flex items-start space-x-4">
            <img 
              src={post.authorImage} 
              alt={post.author}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{post.author}</h3>
              <p className="text-gray-300 leading-relaxed">
                Elite mentor and transformation specialist helping ambitious individuals master the three pillars of success: Body, Social Life, and Wealth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};