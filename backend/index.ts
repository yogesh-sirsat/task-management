import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { authenticate } from "./middlewares/auth.middleware";
import taskRouter from "./routes/task.route";
import userRouter from "./routes/user.route";
import { ObjectId } from "mongodb";

dotenv.config();

declare module "express-session" {
  interface SessionData {
    user: {
      _id: ObjectId | string | undefined;
      fullName: string | undefined;
    };
  }
}
const PORT = process.env.PORT || 4000;
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
const app = express();
const allowedOrigins: string[] = [frontendURL];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: process.env.SESSION_NAME || "TaskManagement",
    secret: process.env.SESSION_SECRET || "mRhgxyIjfbbSY8MazNMDYOHK1aPZkyCp",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 96 * 60 * 60 * 1000,
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/check-session", authenticate, (req: Request, res: Response) => {
  res.status(200).json(req.session.user);
});
app.use("/tasks", authenticate, taskRouter);
app.use("/", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
