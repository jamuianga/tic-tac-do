import React, { useEffect, useState } from 'react';
import { axios } from './main';
import './App.scss';
import Tarefa from './components/tarefa';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState('');
  const [filtroMostrar, setFiltroMostrar] = useState(0);

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

      if (!tarefa) return;

      await axios.post('todos', {
        short_description: tarefa,
      });

      await carregarTarefas();
      setTarefa('');
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
      alert('Ocorreu um erro ao alterar estado da tarefa');
      console.log(error);
    }
  };

  const apagarTarefa = (id) => {
    alert('Por implementar com API');
    // const tarefasAtualizadas = tarefas.filter((el) => el.id != id);
    // setTarefas(tarefasAtualizadas);
    // localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
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
            value={tarefa}
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
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
