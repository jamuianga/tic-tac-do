import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState('');
  const [autoIncTarefa, setAutoIncTarefa] = useState(1);

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
    const index = tarefas.findIndex((el) => el.id == id);
    let tarefasAtualizadas = JSON.parse(JSON.stringify(tarefas)); 

    tarefasAtualizadas[index].concluida = !tarefasAtualizadas[index].concluida;

    setTarefas(tarefasAtualizadas);
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
  };

  // useEffect(() => {
  //   console.log(tarefas);
  // }, [tarefas]);

  const apagarTarefa = (id) => {
    const tarefasAtualizadas = tarefas.filter((el) => el.id != id);
    setTarefas(tarefasAtualizadas);
    localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
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
            const concluida = el.concluida == true ? 'concluida' : '';

            return (
              <div className={`tarefa ${concluida}`} key={index}>
                <span>{el.tarefa}</span>
                <button type="button" onClick={() => tarefaConcluida(el.id)}>
                  {el.concluida == true ? 'Não concluida' : 'Concluida'}
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
