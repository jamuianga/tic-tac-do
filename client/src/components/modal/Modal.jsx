import React from "react";
import ReactDom from "react-dom";
import { X } from "react-bootstrap-icons";

import styles from "./Modal.module.scss";

function Modal({ children, isOpen, onClose, title }) {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span>{title}</span>
          <span className={styles.icon}>
            <X onClick={onClose} />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
