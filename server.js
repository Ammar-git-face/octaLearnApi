const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000;
const courseRoute = require('./src/routes/course.routes')
const mongoose = require('mongoose')
const mongodbUrl = "mongodb://localhost:27017/schoolDb";
app.use(express.json())
app.use('/api', courseRoute)
mongoose.connect(mongodbUrl)
    .then(() => console.log('database connected'))
    .catch((error) => console.log(`mongoDb connection ${error}`))



app.listen(port, () => {
    console.log(`app running on port ${port}`)
})