import express from 'express'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
  }),
)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Product service')
})

app.listen(8000, () => {
  console.log('Product service is running on http://localhost:8000')
})
