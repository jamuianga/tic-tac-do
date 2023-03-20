import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material';
import './App.scss';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState('');

  const carregarTarefas = async () => {
    const response = await axios.get('http://localhost:3000/todos');
    setTarefas(response.data.todos);
  };

  const adicionarTarefa = async (e) => {
    try {
      e.preventDefault();

      if (!tarefa) return;

      await axios.post('http://localhost:3000/todos', {
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

      await axios.put(`http://localhost:3000/todos/${id}`, {
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
      await axios.delete(`http://localhost:3000/todos/${id}`);
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
  }, []);

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
        <div>
          {tarefas.map((el) => {
            const concluida = el.is_completed == true ? 'concluida' : '';

            return (
              <div className={`tarefa ${concluida}`} key={el.id}>
                {el.is_completed == true ? (
                  <CheckBoxOutlined
                    onClick={() => atualizarEstadoTarefa(el.id)}
                  />
                ) : (
                  <CheckBoxOutlineBlankOutlined
                    onClick={() => atualizarEstadoTarefa(el.id)}
                  />
                )}
                <span>{el.short_description}</span>
                <button type="button" onClick={() => moverTarefaParaLixeira(el.id)}>
                  Apagar
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
