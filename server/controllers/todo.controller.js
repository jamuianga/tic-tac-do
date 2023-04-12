import TodoModel from "../models/todo.model.js";

const createTodo = async (request, response) => {
  try {
    let { short_description/*, dueDate, priority, is_completed */ } = request.body;

    if (short_description.replace(/\s/g, "") == "") {
      return response.status(400).json("Informe a descrição da tarefa");
    }

    // if (dueDate.replace(/\s/g, "") == "") dueDate = null;

    const todo = await TodoModel.create({
      short_description,
      // due_date: dueDate,
      // priority,
      // is_completed,
      created: Date.now()
    });

    response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

const readTodos = async (request, response) => {
  try {
    let where = {
      is_deleted: false
    };

    if (request.query?.show && request.query?.show != -1) {
      where.is_completed = request.query?.show;
    }

    const todos = await TodoModel.findAndCountAll({
      where,
      order: [["id", "desc"]]
    });

    return response.json({ todos: todos.rows, count: todos.count });
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

const updateTodo = async (request, response) => {
  try {
    if (request.params.id === undefined) {
      return response.status(500).json('Ocorreu um erro de roteamento');
    }

    const todo = await TodoModel.findByPk(request.params.id);

    // verifica se a Tarefa existe
    if (todo == null) {
      return response.status(404).json("Tarefa não encontrada");
    }

    // garante que só seja alterado dados de uma tarefa que não foi apagada
    if (todo.is_deleted == true) {
      return response.status(400).json("Remova a tarefa da caixa de lixo para poder alterar os dados");
    }

    let { short_description, is_completed } = request.body;

    if (short_description.replace(/\s/g, "") == "") {
      return response.status(400).json("Informe a descrição da tarefa");
    }

    await todo.update({
      short_description, is_completed, modified: Date.now()
    });

    response.json();
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

const deleteTodo = async (request, response) => {
  try {
    if (request.params.id === undefined) {
      return response.status(500).json('Ocorreu um erro de roteamento');
    }

    // checks if todo exists in the database or was deleted
    const todo = await TodoModel.findByPk(request.params.id);

    // verifica se a Tarefa existe
    if (todo == null) {
      return response.status(404).json("Tarefa não encontrada");
    }

    // soft delete
    // await todo.update({
    //   is_deleted: true,
    //   modified: Date.now()
    // });

    await todo.destroy();

    response.json('Apagado com sucesso');
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

export default {
  createTodo, readTodos, updateTodo, deleteTodo
};