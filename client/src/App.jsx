import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.scss";
import { ListCheck } from "react-bootstrap-icons";
import TodoItem from "./pages/todos/TodoCard";

import Sidebar from "./components/Sidebar/Sidebar";
import Modal from "./components/modal/Modal";

function App() {
  const shortDescriptionRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();
  const completedRef = useRef();

  const [todos, setTodos] = useState([]);
  const [showTodoForm, setShowTodoForm] = useState(false);

  // const complete_task = (e) => {
  //   const task_id = e.currentTarget.parentNode.id;
  //   console.log(task_id);
  // };

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos");
    // console.log(response.data);
    setTodos(response.data.todos);
  };

  const saveTodo = async (e) => {
    try {
      e.preventDefault();

      const todo = {
        shortDescription: shortDescriptionRef.current.value,
        dueDate: dueDateRef.current.value,
        priority: priorityRef.current.value,
        completed: completedRef.current.checked
      };

      if (todo.shortDescription.replace(/\s/g, "") == "")
        return alert("preencha a descrição");

      console.log(todo, completedRef.current.checked);

      await axios.post("http://localhost:3000/todos", {
        ...todo
      });

      setShowTodoForm(false);

      await fetchTodos();
    } catch (error) {
      // if (error.data) console.log(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchTodos();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar />

        <div className="main">
          {/* <TodoForm open={isFormOpen} onClose={() => setIsFormOpen(false)} /> */}
          <div className="heading">
            <div className="title">
              <ListCheck /> <span>Tarefas</span>
            </div>
            <button onClick={() => setShowTodoForm(true)}>Adicionar</button>
          </div>
          <div className="tasks">
            {todos.map((todo, index) => {
              return <TodoItem data={todo} key={index} />;
            })}
          </div>
          <Modal
            isOpen={showTodoForm}
            onClose={() => setShowTodoForm(false)}
            title="Adicionar tarefa"
          >
            <form className="form-todo" onSubmit={(e) => saveTodo(e)}>
              <div className="form-group">
                <label>Descrição</label>
                <textarea rows="4" maxLength={255} ref={shortDescriptionRef} />
              </div>
              <div className="form-group">
                <label>Data de entrega</label>
                <input type="date" ref={dueDateRef} />
              </div>
              <div className="row form-group">
                <label>Prioridade</label>
                <select ref={priorityRef}>
                  <option value=""></option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              <div className="form-group">
                <div className="checkbox">
                  <input type="checkbox" id="completed" ref={completedRef} />
                  <label htmlFor="completed">Concluído</label>
                </div>
              </div>
              <button type="submit">Salvar</button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
