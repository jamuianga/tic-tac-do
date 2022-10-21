import React from "react";
import ReactDom from "react-dom";
import styles from "./TodoForm.module.scss";

function TodoForm({ children, open, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div className={styles.modal}>
      <div className="dialog">
        Modal
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default TodoForm;
