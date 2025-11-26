import React, { useState } from "react";
import CreateNoteModal from "../../CreateNoteModal/CreateNoteModal";

export default function NewNoteButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button style={styles.addNote}  onClick={() => setIsModalOpen(true)}>+ Nova Nota</button>
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  addNote: {
    background: "#fbc9abff", // roxo pastel suave
    color: "#ff914d", // roxo escuro para contraste
    border: "none",
    padding: "10px 16px",
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    // justifySelf: "flex-end",
    fontWeight: 600,
    transition: "all 0.2s",
  },
};
