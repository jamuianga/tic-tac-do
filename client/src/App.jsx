import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState('');
  const [autoIncTarefa, setAutoIncTarefa] = useState(1);

  const adicionarTarefa = (e) => {
    e.preventDefault();

    tarefas.push({
      id: autoIncTarefa,
      tarefa: tarefa,
    });

    setTarefas(tarefas);
    setAutoIncTarefa((prevAutoIncTarefa) => prevAutoIncTarefa + 1);

    localStorage.setItem('auto_inc_tarefa', autoIncTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    setTarefa('');
  };

  useEffect(() => {
    let autoIncTarefa = localStorage.getItem('auto_inc_tarefa');
    let tarefasDB = localStorage.getItem('tarefas');

    if (!autoIncTarefa) {
      autoIncTarefa = 1;
      localStorage.setItem('auto_inc_tarefa', autoIncTarefa);
    } else {
      setAutoIncTarefa(localStorage.getItem('auto_inc_tarefa'));
    }

    if (!tarefasDB) {
      localStorage.setItem('tarefas', tarefas);
    } else {
      setTarefas(JSON.parse(tarefasDB));
    }
  }, []);

  return (
    <>
      <nav>Tarefas</nav>
      <main>
        <form onSubmit={adicionarTarefa}>
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {tarefas.map((el, index) => {
            return (
              <li key={index}>
                <span>{el.tarefa}</span>
                <button type="button">Apagar</button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
