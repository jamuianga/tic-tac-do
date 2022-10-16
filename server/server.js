import express from "express";
import cors from "cors";
import "dotenv/config";
import * as TodoController from "./controllers/TodoController.js";

const app = express();

app.use(cors());

app.get("/todos", TodoController.readTodos);

app.listen(3000, () => {
  console.log(`Local: http://localhost:3000`);
});
