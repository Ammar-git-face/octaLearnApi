const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const courseRoute = require('./src/routes/course.routes');
const authRoute = require('./src/routes/auth.routes');
const noteRoute = require('./src/routes/note.routes');
const messageRoute = require('./src/routes/message.routes');
const askAiRoute = require('./src/routes/askAi.routes');
const connectionRoute = require('./src/routes/connection.routes');
const settingsRoute = require('./src/routes/settings.routes');
<<<<<<< HEAD
const usersRoute = require('./src/routes/user.routes');
=======
const handoutRoute = require('./src/routes/handout.routes');
const dashboardRoute = require('./src/routes/dashboard.routes');
const userRoute = require('./src/routes/user.routes');
>>>>>>> 4feece19e3750df76da52afad14afe050dcc189a

const app = express();
const port = 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', courseRoute);
app.use('/api', authRoute);
app.use('/api', noteRoute);
app.use('/api', messageRoute);
app.use('/api', askAiRoute);
app.use('/api', connectionRoute);
app.use('/api', settingsRoute);
<<<<<<< HEAD
app.use('/api', usersRoute);
=======
app.use('/api', handoutRoute);
app.use('/api', dashboardRoute);
app.use('/api', userRoute);
>>>>>>> 4feece19e3750df76da52afad14afe050dcc189a

mongoose.connect("mongodb://localhost:27017/schoolDb")
    .then(() => console.log(" Database connected"))
    .catch(err => console.log(" Mongo error:", err));

io.on('connection', socket => {
    console.log('Client connected:', socket.id);

    socket.on("join", userId => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
});
