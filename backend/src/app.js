import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Set up CORS middleware
/*
app.use(cors({
    origin: ["https://jio-saavn-music-637x.vercel.app"],
    methods: ["POST", "GET", "PATCH"],
    credentials: true
}));
*/
// Allow preflight requests
app.options('*', cors());

// Other middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routers
import userRouter from "./router/user.router.js";
import songRouter from "./router/song.router.js";
import followerRouter from "./router/follower.router.js";
import playlistRouter from "./router/playlist.router.js";

// Use routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/songs', songRouter);
app.use('/api/v1/follower', followerRouter);
app.use('/api/v1/playlist', playlistRouter);

// Export the Express app
export { app };
