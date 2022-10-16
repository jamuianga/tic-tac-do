import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import {
  ChevronExpand,
  GraphUp,
  Search,
  ListCheck,
} from "react-bootstrap-icons";
import TodoItem from "./components/todo-card/TodoCard";

import useProfilePhoto from "./assets/profile.jpg";

function App() {
  const [todos, setTodos] = useState([]);

  // const complete_task = (e) => {
  //   const task_id = e.currentTarget.parentNode.id;
  //   console.log(task_id);
  // };

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos");
    console.log(response.data)
    setTodos(response.data.todos);
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchTodos();
    // console.log(todos)
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <div className="brand">TODO</div>
          <div className="user">
            <img src={useProfilePhoto} alt="user profile" />
            <div>
              <div className="name">Sivan Whiteley</div>
              <div className="email">sivanwhiteley@gmail.com</div>
            </div>
            <ChevronExpand />
          </div>
          <div className="searchbar">
            <input type="text" name="" id="" placeholder="Procurar" />
            <Search />
          </div>
          <ul className="menu">
            <li>
              <a href="#">
                <ListCheck className="icon" />
                Tarefas
              </a>
            </li>
            {/* <li>
                <a href="#">Importante</a>
              </li>
              <li>
                <a href="#">Planeado</a>
              </li> */}
            <li>
              <a href="#">
                <GraphUp className="icon" />
                Relatório
              </a>
            </li>
          </ul>
          {/* <div className='tags'>
            <div className='heading'>
              <span>Etiquetas</span>
              <button>
                <Plus />
              </button>
            </div>
            <ul>
              <li>Teste</li>
            </ul>
          </div> */}
        </div>

        <div className="main">
          <div className="heading">
            <div className="title">
              <ListCheck /> <span>Tarefas</span>
            </div>
            <button>Adicionar</button>
          </div>
          <div className="tasks">
            {todos.map((todo, index) => {
              return <TodoItem data={todo} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
