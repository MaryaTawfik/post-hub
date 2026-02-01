import Blogger from '../models/blogger.model';
import { Request, Response } from "express";

export const toggleBlockBlogger = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blogger = await Blogger.findById(id);

    if (!blogger) return res.status(404).json({ message: "Blogger not found" });
    if (blogger.role === 'admin') return res.status(400).json({ message: "Cannot block an admin" });


    blogger.isBlocked = !blogger.isBlocked;
    await blogger.save();

    res.json({ message: `Blogger has been ${blogger.isBlocked ? 'blocked' : 'unblocked'}` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBloggers = async (req: Request, res: Response) => {
  try {
    const bloggers = await Blogger.find({ role: 'blogger' }).select('-password');
    res.json(bloggers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
