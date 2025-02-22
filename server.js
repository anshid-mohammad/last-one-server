// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("./configration/connection");
// const userRouter = require("./router/userRoutes");
// const passport = require("passport");
// const passportConfig = require("./configration/passportConfig");
// const authRoute = require("./router/authRoutes");
// const session = require("express-session");
// const mentorRouter = require("./router/mentorRoutes");
// const adminRouter = require("./router/adminRoutes");
// const studentRouter = require("./router/studentRoutes");
// // const storeFiles=require("./files/storeFiles")
// const createAdmin = require("./CreateAdmin/admin");
// const sampleFiles = require("./files/sampleFile");
// const messageRoutes = require("./router/messagesRoutes");
// const http = require("http"); // ✅ Required for WebSocket server
// const { Server } = require("socket.io"); // ✅ Corrected socket.io import

// const app = express();
// const server = http.createServer(app); // ✅ Create HTTP server

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true, // ✅ Fixed typo (was "credential")
//   })
// );

// app.use(
//   session({
//     secret: "your_secret_key", // Secret key for signing the session cookie
//     resave: false, // Forces the session to be saved back to the store, even if it wasn't modified
//     saveUninitialized: false, // Prevents storing empty sessions
//     cookie: { secure: false }, // Set `secure: true` if you're using HTTPS
//   })
// );

// createAdmin();

// // Initialize Passport and session handling
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/auth", authRoute);
// app.use("/api/auth", adminRouter);
// app.use("/api/auth", messageRoutes);
// app.use("/api/auth", userRouter, mentorRouter, studentRouter);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ message: "An unexpected error occurred" });
// });

// // ✅ Fixed WebSocket (Socket.io) Initialization
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//     console.log("User added:", userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       io.to(sendUserSocket).emit("msg-receive", data.message);
//     }
//   });

//   socket.on("disconnect", () => {
//     onlineUsers.forEach((value, key) => {
//       if (value === socket.id) {
//         onlineUsers.delete(key);
//       }
//     });
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./configration/connection");
const userRouter = require("./router/userRoutes");
const passport = require("passport");
const passportConfig = require("./configration/passportConfig");
const authRoute = require("./router/authRoutes");
const session = require("express-session");
const mentorRouter = require("./router/mentorRoutes");
const adminRouter = require("./router/adminRoutes");
const studentRouter = require("./router/studentRoutes");
const messageRoutes = require("./router/messagesRoutes");
const http = require("http");
const { Server } = require("socket.io");
const Razorpay =require("razorpay")
const razorpayRoutes=require("./router/razorpayRoutes")
const createAdmin =require("./CreateAdmin/admin")
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(
  cors({
    origin:"https://master.d298fqlts9wdsx.amplifyapp.com", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    exposedHeaders: ["Content-Length", "Content-Type", "Authorization"], // ✅ Expose headers properly

  })
);
createAdmin()
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/api/auth", adminRouter);
app.use("/api/auth", messageRoutes);
app.use("/api/auth", userRouter, mentorRouter, studentRouter,razorpayRoutes);
// Ensure DB is connected before running `createAdmin()`
mongoose.connection.once("open", () => {
  console.log("✅ Database connected successfully");
  createAdmin();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An unexpected error occurred" });
});

const io = new Server(server, {
  cors: {
    origin:"https://master.d298fqlts9wdsx.amplifyapp.com",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User added:", userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});