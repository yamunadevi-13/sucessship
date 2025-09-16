import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddBook: () => void;
  isSearching?: boolean;
}

export function EmptyState({ onAddBook, isSearching = false }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-indigo-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {isSearching ? 'No books found' : 'No books in your library'}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {isSearching 
            ? 'Try adjusting your search terms to find what you\'re looking for.'
            : 'Start building your personal library by adding your first book. Keep track of what you\'ve read and want to read.'
          }
        </p>

        {!isSearching && (
          <button
            onClick={onAddBook}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your First Book
          </button>
        )}
      </div>
    </div>
  );
}