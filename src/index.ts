import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./config/dbConnect";
import activitiesRouter from "./routes/activities";
import todosRouter from "./routes/todos";

const app = express();

dotenv.config();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ message: "hello world" });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/activity-groups", activitiesRouter);
app.use("/todo-items", todosRouter);

app.listen(process.env.PORT, () => {
  console.log(`app is running ${process.env.PORT}`);
  sequelizeConnection;
});
