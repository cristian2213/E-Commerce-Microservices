import mongoose from 'mongoose'

let isConnected = false

export const connectOrderDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  if (!process.env.MONGO_URL) {
    throw new Error('Please provide MONGO_URL in the environment variables')
  }

  try {
    await mongoose.connect(process.env.MONGO_URL)
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}
