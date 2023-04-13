import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import axiosHttp from 'axios';
import Tarefa from './components/tarefa';

import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material';
import './App.scss';

export const axios = axiosHttp.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

function App() {
  const tarefaRef = useRef();
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState({});
  const [filtroMostrar, setFiltroMostrar] = useState(0);
  const [showTarefaModal, setShowTarefaModal] = useState(false);

  const carregarTarefas = async () => {
    const response = await axios.get('todos', {
      params: {
        show: filtroMostrar,
      },
    });

    setTarefas(response.data.todos);
  };

  const adicionarTarefa = async (e) => {
    try {
      e.preventDefault();

      if (!tarefaRef.current.value) return;

      await axios.post('todos', {
        short_description: tarefa,
      });

      await carregarTarefas();

      tarefaRef.current.value = '';
    } catch (error) {
      alert('Ocorreu um erro ao adicionar taref');
      console.log(error);
    }
  };

  const atualizarEstadoTarefa = async (id) => {
    try {
      let tarefa = tarefas.find((el) => el.id == id);

      await axios.put(`todos/${id}`, {
        short_description: tarefa.short_description,
        is_completed: !tarefa.is_completed,
      });

      await carregarTarefas();
    } catch (error) {
      alert('Ocorreu um erro ao alterar estado da tarefa');
      console.log(error);
    }
  };

  const moverTarefaParaLixeira = async (id) => {
    try {
      await axios.delete(`todos/${id}`);
      await carregarTarefas();
    } catch (error) {
      alert('Ocorreu um erro ao apagar tarefa');
      console.log(error);
    }
  };

  const apagarTarefa = (id) => {
    alert('Por implementar com API');
  };

  useEffect(() => {
    const controller = new AbortController();

    carregarTarefas();

    return () => controller.abort();
  }, [filtroMostrar]);

  return (
    <>
      <nav>
        <div className="container">Tic-Tac-Do</div>
      </nav>
      <main>
        <form onSubmit={adicionarTarefa}>
          <input
            className="form-input"
            type="text"
            placeholder="Descrição da tarefa"
            // value={tarefa}
            ref={tarefaRef}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button type="submit" className="form-input">
            Adicionar
          </button>
        </form>
        <div className="filtros">
          <select
            value={filtroMostrar}
            onChange={(e) => setFiltroMostrar(e.target.value)}
          >
            <option value="-1">Todas</option>
            <option value="1">Concluidas</option>
            <option value="0">Não concluidas</option>
          </select>
          {/* <div className="filtrar">
            <button>
              <FilterListOutlined />
              Filtrar
            </button>
            <div className="lista-filtros">
              <div>Todas</div>
              <div>Concluidas</div>
              <div>Não concluidas</div>
            </div>
          </div> */}
        </div>
        <div className="tarefas">
          {tarefas.map((tarefa) => {
            return (
              <Tarefa
                key={tarefa.id}
                tarefa={tarefa}
                atualizarEstadoTarefa={atualizarEstadoTarefa}
                moverTarefaParaLixeira={moverTarefaParaLixeira}
                onEditar={() => {
                  setTarefa(tarefa);
                  setShowTarefaModal(true);
                }}
              />
            );
          })}
        </div>
      </main>
      <TarefaModal
        show={showTarefaModal}
        setShow={setShowTarefaModal}
        close={(e) => {
          e.stopPropagation();
          setShowTarefaModal(false);
        }}
        aTarefa={tarefa}
        carregarTarefas={carregarTarefas}
      />
    </>
  );
}

function TarefaModal({
  show = false,
  setShow,
  close,
  aTarefa,
  carregarTarefas,
}) {
  if (!show) return null;

  const [tarefa, setTarefa] = useState(aTarefa);

  const descricaoOnChange = (e) => {
    setTarefa((state) => {
      return {
        ...state,
        short_description: e.target.value,
      };
    });
  };

  const atualizarTarefa = async (e) => {
    try {
      e.preventDefault();

      await axios.put(`todos/${tarefa.id}`, {
        short_description: tarefa.short_description,
        is_completed: tarefa.is_completed,
      });

      setShow(false);

      await carregarTarefas();
    } catch (error) {
      alert('Ocorreu um erro ao salvar tarefa');
      console.log(error);
    }
  };

  const estadoTarefa = () => {
    setTarefa((state) => {
      return {
        ...state,
        is_completed: !state.is_completed,
      };
    });
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="tarefa-modal">
        <form onSubmit={atualizarTarefa}>
          <input
            className="descricao"
            type="text"
            placeholder="Descrição da tarefa"
            value={tarefa.short_description}
            onChange={descricaoOnChange}
          />
          <div
            onClick={estadoTarefa}
            className={`estado ${tarefa.is_completed ? 'concluida' : ''}`}
          >
            {tarefa.is_completed ? (
              <CheckBoxOutlined />
            ) : (
              <CheckBoxOutlineBlankOutlined />
            )}{' '}
            Concluída
          </div>
          <div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={close}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal'),
  );
}

export default App;
