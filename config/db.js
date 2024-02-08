import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(DATABASE_URL)
        console.log(`Database connected successfully host ${conn.connection.host}`)
    }catch(error){
        console.log(`Error in Database ${error}`)
    }
}

export default connectDB