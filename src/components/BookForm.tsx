import React, { useState, useEffect } from 'react';
import { BookFormData } from '../types';
import { X, Save, Plus } from 'lucide-react';

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
  initialData?: BookFormData;
  mode: 'create' | 'edit';
}

const GENRES = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
  'Fantasy', 'Biography', 'History', 'Self-Help', 'Poetry', 'Drama'
];

export function BookForm({ onSubmit, onCancel, initialData, mode }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    genre: 'Fiction',
    year: new Date().getFullYear(),
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.author.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof BookFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {mode === 'create' ? (
                <>
                  <Plus className="w-6 h-6 text-indigo-600" />
                  Add New Book
                </>
              ) : (
                <>
                  <Save className="w-6 h-6 text-emerald-600" />
                  Edit Book
                </>
              )}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {GENRES.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Year
              </label>
              <input
                type="number"
                min="1000"
                max={new Date().getFullYear() + 10}
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter book description..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
            >
              {mode === 'create' ? (
                <>
                  <Plus className="w-4 h-4" />
                  Add Book
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}