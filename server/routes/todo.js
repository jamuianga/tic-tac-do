import { Router } from "express";
import TodoController from "../controllers/todo.controller.js";

const router = Router();

router.route('/')
  .get(TodoController.readTodos)
  .post(TodoController.createTodo);

router.route('/:id')
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

export default router;