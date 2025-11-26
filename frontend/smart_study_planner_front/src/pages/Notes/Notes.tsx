import { useEffect, useState } from "react";
import "./Notes.css";
import Select from "../../components/ui/Select/Select";
import NewNoteButton from "../../components/ui/NewNoteButton/NewNoteButton";
import NewSubjectButton from "../../components/ui/NewSubjectButton/NewSubjectButton";
import { Subject } from "../../services/models/Subject";
import { deleteResource, fetchResource } from "../../services/resource";
import { useToast } from "../../components/ui/ToastProvider";
import Loading from "../../components/ui/Loading";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import CreateNoteModal from "../../components/CreateNoteModal/CreateNoteModal";
import { Note } from "../../services/models/Note";

export default function NotesPage() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [notes, setNotes] = useState<Note[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    loadSubjects();
    loadNotes();
  }, []);

  const loadSubjects = async () => {
    try {
      const response = await fetchResource<Subject[]>("subjects");
      if (response) {
        setSubjects(response);
      }
    } catch (error) {
      showToast(
        "Erro inesperado ao tentar carregar as categorias. Tente novamente mais tarde.",
        "error"
      );
    }
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await fetchResource<Note[]>("notes");
      setLoading(false);

      if (response) {
        setNotes(response);
      }
    } catch (error) {
      setLoading(false);
      showToast(
        "Erro inesperado ao tentar carregar as notas. Tente novamente mais tarde.",
        "error"
      );
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      setLoading(true);
      await deleteResource("notes", noteId);
    } catch (error) {
      setLoading(false);
      showToast(
        "Erro inesperado ao tentar excluir a nota. Tente novamente mais tarde.",
        "error"
      );
    } finally {
      setLoading(false);
      showToast("Nota excluída com sucesso!", "success");
      loadNotes();
    }
  };

  const handleDeleteClick = (note: Note) => {
    setNoteToDelete(note);
    setShowConfirm(true);
  };

  const confirmDeletion = async () => {
    if (!noteToDelete) return;

    await deleteNote(noteToDelete.id);
    setShowConfirm(false);
    setNoteToDelete(null);
  };

  const filteredNotes =
  selectedCategory === ""
    ? notes
    : notes.filter((note) => note.subject.id.toString() === selectedCategory);
  
  return (
    <div className="notes-page">
      {loading && <Loading />}
      <h1 className="notes-title">Notas</h1>

      <div className="buttons-and-select-container">
        <Select
          options={[
            ...subjects.map((i) => ({
              value: i.id.toString(),
              label: i.name
            })),
            { value: "", label: "Todas" }
          ]}
          placeholder="Escolha uma categoria"
          onChange={(selected) => setSelectedCategory(selected || "")}
          loading={loading}
        />

        <div className="add-note-and-subject">
          <NewNoteButton />
          <NewSubjectButton />
        </div>
      </div>

      <div className={`notes-grid ${filteredNotes.length === 0 ? "empty" : ""}`}>
        {filteredNotes.length === 0 ? (
          <p className="no-notes">Nenhuma nota disponível.</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className="note-card"
            >
              <h2 className="note-card-title">{note.title}</h2>
              <p className="note-card-category">{note.subject.name}</p>
              <p className="note-card-content">{note.content}</p>

              <div className="footer-notes">
                <FaTrash
                  className="trash-icon-notes"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(note);
                  }}
                />;
                <FiEdit
                  className="edit-icon-notes"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNoteToEdit(note);
                    setEditModalOpen(true);
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal da Nota */}
      {selectedNote && (
        <div
          className="notes-modal-overlay"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="notes-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="notes-modal-close"
              onClick={() => setSelectedNote(null)}
            >
              ✕
            </button>

            <div className="notes-modal-header">
              <h2>{selectedNote.title}</h2>
              <p>Categoria: {selectedNote.subject.name}</p>
            </div>

            <div className="notes-modal-body">
              <p>{selectedNote.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showConfirm && (
        <ConfirmModal
          message="Tem certeza que deseja excluir esta nota?"
          onConfirm={confirmDeletion}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {noteToEdit && (
        <CreateNoteModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          note={noteToEdit}
        />
      )}
    </div>
  );
}
