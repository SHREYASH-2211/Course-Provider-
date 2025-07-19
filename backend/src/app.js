import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app   = express();

app.use(cors({
  origin: "http://localhost:8080", // frontend URL
  credentials: true, // allow cookies, headers etc.
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

export default app;