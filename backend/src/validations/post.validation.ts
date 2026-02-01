import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string({
      message: 'Title is required',
    }).trim().max(100, 'Title cannot exceed 100 characters'),
    content: z.string({
      message: 'Content is required',
    }).min(1, 'Content cannot be empty'),
    tags: z.array(z.string()).optional(),
    imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().trim().max(100, 'Title cannot exceed 100 characters').optional(),
    content: z.string().min(1, 'Content cannot be empty').optional(),
    tags: z.array(z.string()).optional(),
    imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  }),
});
