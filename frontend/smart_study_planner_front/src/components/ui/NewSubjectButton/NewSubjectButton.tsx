import React, { useState } from "react";
import CreateSubjectModal from "../../CreateSubjectModal/CreateSubjectModal";


export default function NewSubjectButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        style={styles.addTask}
        onClick={() => setModalOpen(true)}
      >
        + Nova Categoria
      </button>

      <CreateSubjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  addTask: {
    background: "#fbc9abff",
    color: "#ff914d",  
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
