import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import {
  Square,
  ChevronExpand,
  GraphUp,
  Search,
  PencilSquare,
  Trash,
  ListCheck,
  Flag,
} from "react-bootstrap-icons";

import useProfilePhoto from "./assets/profile.jpg";

function App() {
  const [todos, setTodos] = useState();

  const complete_task = (e) => {
    const task_id = e.currentTarget.parentNode.id;
    console.log(task_id);
  };

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos");

    setTodos(response.data);

    console.log(todos);
  };

  useEffect(() => {
    // const get_todos = async () => {};
    fetchTodos();

    // console.log(todos)
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
            {/* <div>
              <button>Filtros</button>
            </div> */}
          </div>
          <div className="tasks">
            {todos.map((todo) => {
              return (
                <div className="task" id={todo.id} key={todo.id}>
                  <button
                    className="checkbox"
                    onClick={(e) => complete_task(e)}
                  >
                    <Square />
                  </button>
                  <div className="title">{todo.short_description}</div>
                  <div className="due">17/10/22</div>
                  <div className="priority">
                    <button>
                      <Flag />
                    </button>
                  </div>
                  <div className="actions">
                    <button>
                      <PencilSquare />
                    </button>
                    <button>
                      <Trash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
