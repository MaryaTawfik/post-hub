import {Request, Response, NextFunction} from 'express'
const authorize=(...roles:string[])=>{
    return(req:Request, res:Response,next:NextFunction)=>{
        if (!req.blogger) {
      return res.status(401).json({ message: 'Not authenticated' })
    }
    if (!roles.includes(req.blogger.role)) {
      return res.status(403).json({ 
        message: `Forbidden: This action requires one of the following roles: ${roles.join(', ')}` 
      })
    }
    next()
    }

}
export default authorize