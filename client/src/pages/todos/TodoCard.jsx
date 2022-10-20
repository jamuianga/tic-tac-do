import React from "react";
import { Square, PencilSquare, Trash, Flag } from "react-bootstrap-icons";

function TodoItem({ data }) {
  return (
    <div className="task" id={data.id}>
      <button className="checkbox" /*onClick={(e) => complete_task(e)}*/>
        <Square />
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
        <button>
          <Trash />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
