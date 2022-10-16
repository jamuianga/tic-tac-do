import UserModel from "../models/TodoModel.js";

export async function readTodos(request, response) {
  try {
    const todos = await UserModel.findAndCountAll();
    // console.log(todos);
    return response.json({ todos: todos.rows, count: todos.count });
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
}
