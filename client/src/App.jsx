import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import {
  ChevronExpand,
  GraphUp,
  Search,
  ListCheck,
} from "react-bootstrap-icons";
import TodoItem from "./pages/todos/TodoCard";

import TodoForm from "./pages/todos/TodoForm";
import Sidebar from "./components/Sidebar/Sidebar";
import Modal from "./components/modal/Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // const complete_task = (e) => {
  //   const task_id = e.currentTarget.parentNode.id;
  //   console.log(task_id);
  // };

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos");
    console.log(response.data);
    setTodos(response.data.todos);
  };

  const btnAdicionarTodoOnClikc = () => {
    alert("Abrir form");
  };

  useEffect(() => {
    const controller = new AbortController();

    // fetchTodos();

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
            <button onClick={() => setIsFormOpen(true)}>Adicionar</button>
          </div>
          <div className="tasks">
            {todos.map((todo, index) => {
              return <TodoItem data={todo} key={index} />;
            })}
          </div>
          <Modal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            title="Adicionar tarefa"
            btnCloseText="Cancelar"
          >
            <h1>Modal</h1>
            <button onClick={() => setIsFormOpen(false)}>Fechar</button>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
