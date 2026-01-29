import mongoose from 'mongoose'
const connectDB= async()=>{
    try{
        const url = process.env.MONGO_URI as string
        const conn = await mongoose.connect(url);
        
        console.log(`✅mongodb connected on ${conn.connection.host}`)
    }catch(error)
{
    console.error('❌mongodberror:',error)
    process.exit(1)
}}

export default connectDB