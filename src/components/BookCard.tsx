import React, { useState } from 'react';
import { Book } from '../types';
import { Edit3, Trash2, BookOpen, Calendar, Tag } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(book.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-gray-600 font-medium mb-3">{book.author}</p>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(book)}
              className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
              title="Edit book"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete book"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{book.genre}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{book.year}</span>
          </div>
        </div>

        {book.description && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Description</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {book.description}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-400 pt-3 border-t border-gray-50">
          Added {book.createdAt.toLocaleDateString()}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Delete Book</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{book.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}