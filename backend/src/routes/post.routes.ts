// import { Router } from 'express'
// import {
//   createPost,
//   getPosts,
//   getPostById,
//   updatePost,
//   deletePost
// } from '../controllers/post.controller'

// // FIX: Added curly braces for named export
// import { authMiddleware } from '../middleware/auth.middleware' 

// const router = Router()

// // Apply authMiddleware to ALL routes below this line
// router.use(authMiddleware)

// router.post('/', createPost)
// router.get('/', getPosts)
// router.get('/:id', getPostById)
// router.put('/:id', updatePost)
// router.delete('/:id', deletePost)

// export default router

import { Router } from 'express'
import {
  createPost, getPosts, getPostById,
  updatePost, deletePost, toggleBookmark
} from '../controllers/post.controller'
import { toggleBlockBlogger, getAllBloggers } from '../controllers/blogger.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import authorize from '../middleware/role.middleware'
import { validate } from '../middleware/validate.middleware'
import { createPostSchema, updatePostSchema } from '../validations/post.validation'
const router = Router()

// --- 1. VISITOR ROUTES (Public) ---
// Anyone can see the feed
router.get('/', getPosts)

// NOTE: Place specific public routes before the dynamic `/:id` route
// so that paths like `/all-bloggers` are not accidentally captured by `/:id`.
// Admin: Get all bloggers (protected)
router.get('/all-bloggers', authMiddleware, authorize('admin'), getAllBloggers)

// Public: Get single post by id
router.get('/:id', getPostById)

// --- 2. PROTECTED ROUTES (Auth Required) ---
// Create new post (blogger)
router.post('/', authMiddleware, validate(createPostSchema), createPost)
// Bookmark a post
router.post('/:id/bookmark', authMiddleware, toggleBookmark)
// Update a post (owner or admin)
router.put('/:id', authMiddleware, validate(updatePostSchema), updatePost)

// --- 3. ADMIN ONLY ROUTES ---
// Admin can delete any post and block users
router.delete('/:id', authMiddleware, authorize('admin'), deletePost)
router.patch('/block-user/:id', authMiddleware, authorize('admin'), toggleBlockBlogger)

export default router