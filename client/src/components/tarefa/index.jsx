import React from 'react';
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material';
import css from './index.module.scss';

function Tarefa({ tarefa, atualizarEstadoTarefa, moverTarefaParaLixeira }) {
  const concluida = tarefa.is_completed == true ? `${css.concluida}` : '';

  return (
    <div className={`${css.tarefa} ${concluida}`}>
      {tarefa.is_completed == true ? (
        <CheckBoxOutlined onClick={() => atualizarEstadoTarefa(tarefa.id)} />
      ) : (
        <CheckBoxOutlineBlankOutlined
          onClick={() => atualizarEstadoTarefa(tarefa.id)}
        />
      )}
      <div className={css.desciption}>{tarefa.short_description}</div>
      <button type="button" onClick={() => moverTarefaParaLixeira(tarefa.id)}>
        Apagar
      </button>
    </div>
  );
}

export default Tarefa;
