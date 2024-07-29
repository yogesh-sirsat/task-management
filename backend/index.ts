import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import taskRouter from "./routes/task.route";
import userRouter from "./routes/user.route";

dotenv.config();

const PORT = process.env.PORT || 4000;
const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
const app = express();
const allowedOrigins: string[] = [frontendURL];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/tasks", taskRouter);
app.use("/", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
