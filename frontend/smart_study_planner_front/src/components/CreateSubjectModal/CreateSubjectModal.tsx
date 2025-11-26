import React, { useState } from "react";
import "./CreateSubjectModal.css";
import { useToast } from "../ui/ToastProvider";
import { useAuth } from "../../context/AuthContext";
import { SubjectResponse } from "../../services/response/SubjectResponse";
import { createResource } from "../../services/resource";
import Loading from "../ui/Loading";

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSubjectModal({ isOpen, onClose }: CreateSubjectModalProps) {
  const [name, setName] = React.useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name ) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }

    if (!user) {
      return;
    }

    const body: SubjectResponse = {
      name,
    };

    setLoading(true);
  
    try {
      await createResource<SubjectResponse>("subjects", body);
      showToast("Categoria criada com sucesso!", "success");
    } catch (error) {
      console.error(error);
      showToast("Erro ao criar a categoria", "error");
      setLoading(false);
    } finally {
      setLoading(false);
      onClose();
      window.location.reload();
    }
  };

  return (
    <div className="modal-subject-overlay">
      {loading && <Loading />}
      <div className="modal-subject-container">
        <h2 className="modal-subject-title">Criar Categoria</h2>
        <input
          className="modal-subject-input"
          type="text"
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-subject-actions">
          <button className="btn-subject cancel-subject" onClick={onClose}>Cancelar</button>
          <button className="btn-subject submit-subject" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
