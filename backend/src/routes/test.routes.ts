import {Router} from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware'
const router =Router()

router.get('/protected',authMiddleware,(req,res)=>{
    res.json({
        message:'you accessed  a proteced route',

        blogger: req.blogger
    })
})




router.get('/admin-only', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: 'Welcome, Admin!',
    data: req.blogger
  })
})
export default router