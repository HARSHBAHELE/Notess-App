const connecttomongo = require('./db')
var cors = require('cors')
connecttomongo();
const express = require('express')
const app = express()
const port = 9000
require('dotenv').config();
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})  