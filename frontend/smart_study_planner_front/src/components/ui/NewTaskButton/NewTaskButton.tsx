import React, { useState } from "react";
import CreateTaskModal from "../../CreateTaskModal/CreateTaskModal";

export default function NewTaskButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        style={styles.addTask}
        onClick={() => setModalOpen(true)}
      >
        + Nova Tarefa
      </button>

      <CreateTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  addTask: {
    background: "#fbc9abff", // roxo pastel suave
    color: "#ff914d",      // roxo escuro para contraste
    border: "none",
    padding: "10px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    justifySelf: "flex-end",
    transition: "all 0.2s",
  },
};
