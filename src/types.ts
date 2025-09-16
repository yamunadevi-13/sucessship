export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  description: string;
  createdAt: Date;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  year: number;
  description: string;
}