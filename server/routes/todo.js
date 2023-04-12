import { Router } from "express";
import TodoController from "../controllers/todo.controller.js";
// import { checkAuth } from '../controllers/auth.controller.js';
import verifyJwt from "../middleware/verify-jwt.js";

const router = Router();

router.use(verifyJwt);

router.route('/')
  .get(TodoController.readTodos)
  .post(TodoController.createTodo);

router.route('/:id')
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

export default router;