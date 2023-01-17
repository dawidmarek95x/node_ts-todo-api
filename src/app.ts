import express, {Request, Response, NextFunction} from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/index";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", indexRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: `Use API on routes:\n
    /todos`,
    data: "Not found",
  });
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
