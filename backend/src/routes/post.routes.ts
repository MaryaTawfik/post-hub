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

// --- 2. PROTECTED ROUTES (Auth Required) ---
router.use(authMiddleware)

// Admin: Get all bloggers (Must be before :id route)
router.get('/all-bloggers', authorize('admin'), getAllBloggers)

// Get single post (Public or Private depending on logic)
router.get('/:id', getPostById)

// --- 3. OWNER/BLOGGER ROUTES ---

router.post('/', validate(createPostSchema), createPost)             // Create new
router.post('/:id/bookmark', toggleBookmark) // Bookmark
router.put('/:id', validate(updatePostSchema), updatePost)           // Update (Controller checks if owner)

// --- 3. ADMIN ONLY ROUTES ---
// Admin can delete any post and block users
router.delete('/:id', authorize('admin'), deletePost)
router.patch('/block-user/:id', authorize('admin'), toggleBlockBlogger)

export default router