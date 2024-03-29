import React from 'react';
import {
  Square,
  CheckSquare,
  PencilSquare,
  Trash,
  Flag,
} from 'react-bootstrap-icons';

function TodoItem({ data, onDelete }) {
  return (
    <div className="task" id={data.id}>
      <button className="checkbox" /*onClick={(e) => complete_task(e)}*/>
        {data.is_completed == false ? <Square /> : <CheckSquare />}
      </button>
      <div className="title">{data.short_description}</div>
      <div className="due">{data.due_date}</div>
      <div className="priority">
        <button>
          <Flag />
        </button>
      </div>
      <div className="actions">
        <button>
          <PencilSquare />
        </button>
        <button onClick={() => onDelete(data.id)}>
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
