import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import testRoutes from './routes/test.routes'
import postRoutes from './routes/post.routes'
const app = express()


app.use(cors({
  origin: true, // This allows the req origin dynamically
  credentials: true
}));


app.use(express.json())

app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/test',testRoutes)

app.use('/api/posts', postRoutes)
app.get('/',(req,res)=>{
    res.send('API is running')
})

export default app