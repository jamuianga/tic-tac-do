import React from 'react'
import './App.scss'

import { ChevronBarExpand, ChevronExpand, Search } from 'react-bootstrap-icons';

import useProfilePhoto from './assets/profile.jpg';

function App() {

  return (
    <>
      <div className='wrapper'>
        <div className='sidebar'>
          <div className='brand'>
            TODO
          </div>
          <div className='user'>
            <img src={useProfilePhoto} alt="user profile" />
            <div>
              <div className='name'>Sivan Whiteley</div>
              <div className='email'>sivanwhiteley@gmail.com</div>
            </div>
            <ChevronExpand />
          </div>
          <div className='searchbar'>
            <input type="text" name="" id="" placeholder='Procurar' />
            <Search />
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
      </div>
    </>
  )
}

export default App
