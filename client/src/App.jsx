import React from 'react'
import './App.css'

function App() {

  return (
    <>
      <div>
        <div>
          TODO
        </div>
        <div>
          <img src="" alt="user profile" />
          <div>
            <div>user full name</div>
            <div>user email</div>
          </div>
        </div>
        <div>
          <input type="text" name="" id="" placeholder='Procurar' />
        </div>
        <div>
          <ul>
            <li>
              <a href="#">Tarefas</a>
            </li>
            <li>
              <a href="#">Importante</a>
            </li>
            <li>
              <a href="#">Planeado</a>
            </li>
            <li>
              <a href="#">Stats</a>
            </li>
          </ul>
        </div>
        <div>
          Etiquetas
          <button>
            add list
          </button>
          <ul>
            <li>Teste</li>
          </ul>
        </div>
      </div>

      <div className='main'>
        <div className='header'>
          <div>titulo</div>
          <div>
            <button>Adicionar</button>
            <button>Filtros</button>
          </div>
        </div>
        <div className='todo-list'>
          <div className='task'>
            <div>Todo name</div>
            <div className="meta">
              <div>dates</div>
              <div>priority</div>
            </div>
            <div>
              tag
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
