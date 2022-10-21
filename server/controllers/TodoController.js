import UserModel from "../models/TodoModel.js";

export const readTodos = async (request, response) => {
  try {
    const todos = await UserModel.findAndCountAll({ order: [["id", "desc"]] });

    return response.json({ todos: todos.rows, count: todos.count });
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

export const createTodo = async (request, response) => {
  try {
    let { shortDescription, dueDate, priority, completed } = request.body;

    if (shortDescription.replace(/\s/g, "") == "")
      return response.status(400).json("Informe a descrição da tarefa");

    if (dueDate.replace(/\s/g, "") == "") dueDate = null;

    const todo = await UserModel.create({
      short_description: shortDescription,
      due_date: dueDate,
      priority,
      completed,
      created: new Date()
    });

    response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};
