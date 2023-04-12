import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import AuthRouter from './routes/auth.router.js';
import TodoRouter from './routes/todo.router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/auth', AuthRouter);
app.use('/todos', TodoRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is up on: http://localhost:${process.env.PORT}`);
});
