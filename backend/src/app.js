import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app   = express();

const allowedOrigins = process.env.CORS_ORIGIN.split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";

//Routes declaration
app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/users/register

import eventRoutes from './routes/event.routes.js';

app.use('/api/events', eventRoutes);

import announcementRoutes from './routes/announcement.routes.js';
app.use("/api/announcement", announcementRoutes);
export default app;