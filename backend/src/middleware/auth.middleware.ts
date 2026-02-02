import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import Blogger from '../models/blogger.model'
interface jwtPayload {
  id: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      blogger?: JwtPayload
    }
  }
}

// export const authMiddleware=(
//     req:Request,
//     res:Response,
//     next:NextFunction
// )=>{
//     const token =req.cookies.token

//     if(!token){
//         return res.status(401).json({message:'not autherized please login'})
//     }
//     try{
//         const decoded=jwt.verify(
//             token,
//             process.env.JWT_SECRET as string
//         ) as JwtPayload
//         req.blogger= decoded
//         next()
//     }catch(error){
//         return res.status(401).json({message:'Session expired, please login again'})
//     }
// }
// src/middleware/auth.middleware.ts

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.token;

    // Check Authorization header if cookie is missing
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // 1. Fetch the blogger from the database to check current status
    const currentBlogger = await Blogger.findById(decoded.id);

    if (!currentBlogger) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // 2. THE BLOCK CHECK:
    if (currentBlogger.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by an admin. Please contact support."
      });
    }

    // 3. Attach blogger to request
    req.blogger = {
      id: String(currentBlogger._id),
      role: currentBlogger.role
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.blogger && req.blogger.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Acess denied:admin only' })
  }
}