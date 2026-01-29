import dotenv from 'dotenv'
dotenv.config()




import app from './app'
import connectDB from './config/db'
 const port= process.env.PORT|| 5000

 connectDB()
 app.listen(port,()=>{
    console.log(`💪server running on port ${port}`)
 })