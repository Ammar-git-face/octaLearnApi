const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000;
const courseRoute = require('./src/routes/course.routes')
const authRoute = require('./src/routes/auth.routes')
const askAiRoute = require('./src/routes/course.routes')
const noteRoute = require('./src/routes/note.routes')
const mongoose = require('mongoose')
const mongodbUrl = "mongodb://localhost:27017/schoolDb";
app.use(express.json())
app.use('/api', courseRoute)
app.use('/api', authRoute)
app.use('/api', askAiRoute)
app.use('/api', noteRoute)
mongoose.connect(mongodbUrl)
    .then(() => console.log('database connected'))
    .catch((error) => console.log(`mongoDb connection ${error}`))



app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
