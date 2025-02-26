
import connecttomongo from './db.js';
import cors from 'cors';
connecttomongo();
import express from 'express'
const app = express()
const port = 9000
import path from 'path';
import authRoutes from './routes/auth.js'; 
import authRoutes1 from './routes/notes.js'; 
const _dirname = path.resolve();
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/notes',authRoutes1)

app.use(express.static(path.join(_dirname,"/inotebook/build")))
app.get('*',(req,res)=> {
  req.sendFile(path.resolve(_dirname,"inotebook","build","index.html"))
})

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})  