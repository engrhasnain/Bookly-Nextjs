'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookApi } from '../api/bookApi';
import { BookCreate } from '../types/book.types';

export const useBooks = () => {
  const queryClient = useQueryClient();

  // ---------------------------
  // FETCH ALL BOOKS
  // ---------------------------
  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['books'],        // 🔑 cache key
    queryFn: bookApi.getAll,    // API call
  });

  // ---------------------------
  // CREATE BOOK
  // ---------------------------
  const createBookMutation = useMutation({
    mutationFn: (data: BookCreate) => bookApi.create(data),

    onSuccess: () => {
      // 🔥 Automatically refetch books after creation
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
  });

  return {
    books,
    loading: isLoading,
    error: isError ? 'Failed to fetch books' : null,
    addBook: createBookMutation.mutateAsync,
  };
};
