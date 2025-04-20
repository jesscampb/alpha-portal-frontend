// ChatGPT generated code

import React from "react";

const Modal = ({ isOpen, title, children, onClose }) => {

  return (
    <div className={`modal ${isOpen ? "flex" : "none"}`}>
      <div className="modal-content">
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="btn-close" onClick={onClose}></button>
        </header>
        <main className="modal-body">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Modal;
