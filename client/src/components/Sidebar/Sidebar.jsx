import React from "react";
import {
  ChevronExpand,
  GraphUp,
  Search,
  ListCheck,
} from "react-bootstrap-icons";
import useProfilePhoto from "../../assets/profile.jpg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <a href="/">TODO</a>
      </div>
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
  );
}

export default Sidebar;
