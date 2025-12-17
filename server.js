const express = require("express");
const mongoose = require("mongoose");
const mongodbUrl = "mongodb://localhost:27017/OctaLearn";
const cors = require('cors')
const app = express();
const port = 2000;
app.use(express.json());
const userRoute = require('./src/routes/user.routes')
const authRoute = require('./src/routes/auth.routes')
const askAiRoute = require('./src/routes/askAi.routes')
const dashboardRoute = require('./src/routes/dashboard.routes')
app.use(cors({
  origin:[
    'http://localhost:3000',
   
  ]
}))

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("database connected"))
  .catch((error) => console.log(`mongodb connection ${error}`));

app.use('/api', userRoute)
app.use('/api', authRoute)
app.use('/api', askAiRoute)
app.use('/api', dashboardRoute)

app.listen(port, () => {
  console.log(`app running on port${port}`);
});
