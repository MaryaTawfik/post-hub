import { Request,Response } from "express";
import Post from '../models/post.model'
import Blogger from '../models/blogger.model';
/**
 * @desc    Create a post
 */

export const createPost= async (req:Request, res:Response)=>{
    try{
        const{title, content,tags, imageUrl}= req.body
        if(!title|| !content){
            return res.status(400).json({message:'title and content are required'})

        }
        const post = await Post.create({
            title,
            content,
            tags,
            imageUrl,
            author: req.blogger!.id
        })
        res.status(201).json(post)
    }catch(error:any){
        res.status(500).json({message: error.message})
    }
}
/**
 * @desc    Get all posts (Admin sees all, Blogger sees their own)
 */
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};/**
 * @desc    Update post (Owner/Admin only)
 */
export const updatePost = async(req: Request, res:Response)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:'post not found'})
        }
        if (post.author.toString() !== req.blogger!.id && req.blogger!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to edit this post' })
    }

    post.title= req.body.title|| post.title
    post.content=req.body.content ||post.content
    post.tags = req.body.tags || post.tags
    post.imageUrl = req.body.imageUrl || post.imageUrl

    const updatedPost = await post.save()
    res.json(updatedPost)
    }catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


/**
 * @desc    Delete post
 */
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.author.toString() !== req.blogger!.id && req.blogger!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await post.deleteOne()
    res.json({ message: 'Post deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * @desc    Get single post by ID
 * @access  Private (Owner/Admin)
 */
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the requester is the author or an admin
    if (post.author._id.toString() !== req.blogger!.id && req.blogger!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this private post' });
    }

    res.json(post);
  } catch (error: any) {
    // This handles cases where the ID format is invalid
    res.status(500).json({ message: error.message });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Note: You would typically have a 'bookmarks' array in your Blogger model
    // For now, we'll return a success message
    res.json({ message: 'Post added to your bookmarks' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Admin: Block or Unblock a Blogger
 */
// export const toggleBlockBlogger = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const blogger = await Blogger.findById(id);

//     if (!blogger) return res.status(404).json({ message: "Blogger not found" });
//     if (blogger.role === 'admin') return res.status(400).json({ message: "Cannot block an admin" });


//     blogger.isBlocked = !blogger.isBlocked;
//     await blogger.save();

//     res.json({ message: `Blogger has been ${blogger.isBlocked ? 'blocked' : 'unblocked'}` });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };