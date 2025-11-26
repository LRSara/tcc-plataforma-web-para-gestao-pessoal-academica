import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Priority } from "../../services/models/Task";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../ui/ToastProvider";
import { createResource } from "../../services/resource";
import { TaskResponse } from "../../services/response/TaskResponse";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ isOpen, onClose }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!title || !deadline || !priority) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }

    if (!user) {
      return;
    }

    const body: TaskResponse = {
      title,
      description,
      due_date: deadline,
      priority,
      status: "nao_concluida",
    };

    setLoading(true);
    try {
      await createResource<TaskResponse>("tasks", body);
      showToast("Tarefa criada com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showToast("Erro ao criar a tarefa", "error");
    } finally {
      setLoading(false);
      onClose();
      window.location.reload();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h4 style={{ margin: 0 }}>Nova Tarefa</h4>
          <button onClick={onClose} style={styles.closeBtn}>
            <FiX size={22} />
          </button>
        </div>

        <div style={styles.form}>
          <label style={styles.label}>Título</label>
          <input
            style={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da tarefa"
          />

          <label style={styles.label}>Descrição</label>
          <textarea
            style={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes da tarefa..."
          />

          <label style={styles.label}>Data de Entrega</label>
          <input
            style={styles.input}
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <label style={styles.label}>Prioridade</label>
          <select
            style={styles.input}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button
            style={styles.saveBtn}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    width: "400px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    animation: "fadeIn 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
    color: "black",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#333",
  },
  input: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  textarea: {
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    minHeight: "80px",
    resize: "vertical",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  cancelBtn: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    background: "#f5f5f5",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#fbc9abff", // tom pastel roxo
    color: "#ff914d",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
  },
};
