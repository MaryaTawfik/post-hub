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
import { toggleBlockBlogger } from '../controllers/blogger.controller' 
import { authMiddleware } from '../middleware/auth.middleware'
import authorize from '../middleware/role.middleware'

const router = Router()

// --- 1. VISITOR ROUTES (Public) ---
// Anyone can see the feed or a specific post
router.get('/', getPosts)
router.get('/:id', getPostById)

// --- 2. OWNER/BLOGGER ROUTES (Auth Required) ---
router.use(authMiddleware)

router.post('/', createPost)             // Create new
router.post('/:id/bookmark', toggleBookmark) // Bookmark
router.put('/:id', updatePost)           // Update (Controller checks if owner)

// --- 3. ADMIN ONLY ROUTES ---
// Admin can delete any post and block users
router.delete('/:id', authorize('admin'), deletePost)
router.patch('/block-user/:id', authorize('admin'), toggleBlockBlogger)

export default router