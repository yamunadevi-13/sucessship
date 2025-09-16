import React, { useState, useMemo } from 'react';
import { useBooks } from './hooks/useBooks';
import { BookForm } from './components/BookForm';
import { BookCard } from './components/BookCard';
import { SearchBar } from './components/SearchBar';
import { EmptyState } from './components/EmptyState';
import { Book, BookFormData } from './types';
import { Plus, Library, Sparkles } from 'lucide-react';

type FormMode = 'create' | 'edit' | null;

function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    
    const query = searchQuery.toLowerCase().trim();
    return books.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  const handleAddBook = (data: BookFormData) => {
    addBook(data);
    setFormMode(null);
  };

  const handleEditBook = (data: BookFormData) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setFormMode(null);
      setEditingBook(null);
    }
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setFormMode('edit');
  };

  const handleCloseForm = () => {
    setFormMode(null);
    setEditingBook(null);
  };

  const isEmpty = books.length === 0;
  const isSearchEmpty = filteredBooks.length === 0 && searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Library className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Library</h1>
                <p className="text-sm text-gray-600">
                  {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
                </p>
              </div>
            </div>

            <button
              onClick={() => setFormMode('create')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Book
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isEmpty && (
          <div className="mb-8">
            <div className="max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by title, author, or genre..."
              />
            </div>
          </div>
        )}

        {isEmpty ? (
          <EmptyState onAddBook={() => setFormMode('create')} />
        ) : isSearchEmpty ? (
          <EmptyState onAddBook={() => setFormMode('create')} isSearching />
        ) : (
          <>
            {searchQuery && (
              <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span>
                  Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} 
                  matching "{searchQuery}"
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEditClick}
                  onDelete={deleteBook}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Form Modal */}
      {formMode && (
        <BookForm
          mode={formMode}
          onSubmit={formMode === 'create' ? handleAddBook : handleEditBook}
          onCancel={handleCloseForm}
          initialData={editingBook ? {
            title: editingBook.title,
            author: editingBook.author,
            genre: editingBook.genre,
            year: editingBook.year,
            description: editingBook.description
          } : undefined}
        />
      )}
    </div>
  );
}

export default App;