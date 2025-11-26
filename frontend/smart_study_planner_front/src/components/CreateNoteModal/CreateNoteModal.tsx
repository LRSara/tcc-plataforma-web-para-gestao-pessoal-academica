import React, { useEffect, useState } from "react";
import "./CreateNoteModal.css";
import { FiX } from "react-icons/fi";
import { createResource, fetchResource, updateResource } from "../../services/resource";
import { Subject } from "../../services/models/Subject";
import { useToast } from "../ui/ToastProvider";
import { useAuth } from "../../context/AuthContext";
import { NoteResponse } from "../../services/response/NoteResponse";
import { Note } from "../../services/models/Note";

type ModalCreateNoteProps = {
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
};

export default function CreateNoteModal({
  isOpen,
  onClose,
  note,
}: ModalCreateNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      loadSubjects();

      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.subject.id.toString());
      }
    }
  }, [isOpen, note]);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const response = await fetchResource<Subject[]>("subjects");
      if (response) setCategories(response);
    } catch (error) {
      showToast(
        "Erro ao carregar categorias. Tente novamente mais tarde.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!title || !content) {
      showToast("Preencha todos os campos obrigatórios", "error");
      return;
    }

    if (!user) {
      showToast("Usuário não autenticado.", "error");
      return;
    }

    const body: NoteResponse = {
      title,
      content,
      subject_id: parseInt(category) || null,
      is_favorite: false,
    };

    try {
      setLoading(true);

      if (note) {
        await updateResource<NoteResponse>("notes", note.id, body);
        showToast("Nota atualizada com sucesso!", "success");
      } else {
        await createResource<NoteResponse>("notes", body);
        showToast("Nota criada com sucesso!", "success");
      }

      setTitle("");
      setContent("");
      setCategory("");
      onClose();
      window.location.reload();

    } catch (error) {
      console.error(error);
      showToast("Erro ao salvar a nota", "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="header">
          <h2 className="title">{note ? "Editar Nota" : "Nova Nota"}</h2>
          <button onClick={onClose} className="closeBtn">
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label htmlFor="title" className="label">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da nota"
            required
          />

          <label htmlFor="content" className="label">
            Conteúdo
          </label>
          <textarea
            id="content"
            rows={10}
            maxLength={5000}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva o conteúdo da nota..."
            required
          />

          <label htmlFor="category" className="label">
            Categoria
          </label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            {loading ? (
              <option value="">Carregando...</option>
            ) : categories.length === 0 ? (
              <option value="">Nenhuma categoria foi criada ainda</option>
            ) : (
              <>
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </>
            )}
          </select>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
