import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import blogRouter from './routes/blogRoutes.js'

const app = express() 
await connectDB()

const PORT = process.env.PORT || 4000

// Middlewares 
app.use(cors())
app.use(express.json())


// api 
app.get('/', (req, res) => {
  res.send("API is working")
})

app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
})


export default app;