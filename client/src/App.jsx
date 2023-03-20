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

  const adicionarTarefa = (e) => {
    e.preventDefault();

    if (!tarefa) return;

    tarefas.push({
      id: autoIncTarefa,
      tarefa: tarefa,
      concluida: false,
    });

    setTarefas(tarefas);
    setAutoIncTarefa((prevAutoIncTarefa) => parseInt(prevAutoIncTarefa) + 1);

    localStorage.setItem('auto_inc_tarefa', autoIncTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    setTarefa('');
  };

  const tarefaConcluida = (id) => {
    alert('Por implementar com API');
    // const index = tarefas.findIndex((el) => el.id == id);
    // let tarefasAtualizadas = JSON.parse(JSON.stringify(tarefas));

    // tarefasAtualizadas[index].concluida = !tarefasAtualizadas[index].concluida;

    // setTarefas(tarefasAtualizadas);
    // localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
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
        <div className="container">Tarefas</div>
      </nav>
      <main>
        <form onSubmit={adicionarTarefa}>
          <input
            className="form-input"
            type="text"
            placeholder="Nome da tarefa"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button type="submit" className="form-input">
            Adicionar
          </button>
        </form>
        <div>
          {tarefas.map((el, index) => {
            const concluida = el.is_completed == true ? 'concluida' : '';

            return (
              <div className={`tarefa ${concluida}`} key={el.id}>
                {el.is_completed == true ? (
                  <CheckBoxOutlined onClick={() => tarefaConcluida(el.id)} />
                ) : (
                  <CheckBoxOutlineBlankOutlined
                    onClick={() => tarefaConcluida(el.id)}
                  />
                )}
                <span>{el.short_description}</span>
                <button type="button" onClick={() => tarefaConcluida(el.id)}>
                  {el.is_completed == true ? 'Não concluida' : 'Concluida'}
                </button>
                <button type="button" onClick={() => apagarTarefa(el.id)}>
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
