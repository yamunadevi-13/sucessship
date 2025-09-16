import { useState, useEffect } from 'react';
import { Book, BookFormData } from '../types';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  // Load books from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks).map((book: any) => ({
        ...book,
        createdAt: new Date(book.createdAt)
      }));
      setBooks(parsedBooks);
    }
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (bookData: BookFormData) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setBooks(prev => [newBook, ...prev]);
  };

  const updateBook = (id: string, bookData: BookFormData) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...bookData } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const getBook = (id: string) => {
    return books.find(book => book.id === id);
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBook
  };
}