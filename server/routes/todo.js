import { Router } from "express";
import * as TodoController from "../controllers/TodoController.js";

const router = Router();

router.route('/')
  .get(TodoController.readTodos)
  .post(TodoController.createTodo);

router.route('/:todo_id')
  .delete(TodoController.deleteTodo);

export default router;