import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { blogPosts as initialBlogPosts } from '../data/blogData';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyPost: Omit<BlogPost, 'id'> = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    authorImage: '',
    category: 'body',
    tags: [],
    imageUrl: '',
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: 5,
    featured: false
  };

  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>(emptyPost);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData(emptyPost);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      authorImage: post.authorImage,
      category: post.category,
      tags: post.tags,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      featured: post.featured
    });
  };

  const handleSave = () => {
    if (isCreating) {
      const newPost: BlogPost = {
        ...formData,
        id: Date.now().toString(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      setPosts([newPost, ...posts]);
    } else if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...formData, id: editingPost.id, slug: formData.slug || editingPost.slug }
          : post
      ));
    }
    
    setIsCreating(false);
    setEditingPost(null);
    setFormData(emptyPost);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingPost(null);
    setFormData(emptyPost);
  };

  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isEditing = isCreating || editingPost !== null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Blog Admin Panel</h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {!isEditing ? (
            <>
              {/* Create Button */}
              <div className="mb-6">
                <button
                  onClick={handleCreate}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-600 text-white rounded-lg hover:from-yellow-600 hover:to-red-700 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create New Post</span>
                </button>
              </div>

              {/* Posts List */}
              <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{post.title}</h3>
                          {post.featured && (
                            <span className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>By {post.author}</span>
                          <span>{post.category}</span>
                          <span>{post.readTime} min read</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Edit Form */
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isCreating ? 'Create New Post' : 'Edit Post'}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => updateFormData('slug', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => updateFormData('author', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Author Image URL</label>
                    <input
                      type="url"
                      value={formData.authorImage}
                      onChange={(e) => updateFormData('authorImage', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateFormData('category', e.target.value as any)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="body">Dream Body</option>
                      <option value="social">Social Mastery</option>
                      <option value="wealth">Wealth Creation</option>
                      <option value="mindset">Elite Mindset</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => updateFormData('imageUrl', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Read Time (minutes)</label>
                      <input
                        type="number"
                        value={formData.readTime}
                        onChange={(e) => updateFormData('readTime', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Published Date</label>
                      <input
                        type="date"
                        value={formData.publishedAt}
                        onChange={(e) => updateFormData('publishedAt', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => updateFormData('featured', e.target.checked)}
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500"
                      />
                      <span className="text-gray-300">Featured Post</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={(e) => updateFormData('tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => updateFormData('excerpt', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => updateFormData('content', e.target.value)}
                      rows={20}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none resize-none font-mono text-sm"
                      placeholder="Use markdown formatting:
# Main heading
## Sub heading
### Sub-sub heading
- Bullet point
**Bold text**"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};