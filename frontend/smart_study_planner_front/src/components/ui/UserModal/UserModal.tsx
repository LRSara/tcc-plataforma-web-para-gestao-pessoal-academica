import { useState, useEffect, useRef } from "react";
import "./UserModal.css";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";
import { useToast } from "../ToastProvider";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import Loading from "../Loading";

function UserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleDelete = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await api.delete("/delete-account"); // backend identifica usuário pelo token
      showToast("Sua conta foi excluída!", "success");
      logout();
      setIsOpen(false);
    } catch (error) {
      showToast(
        "Erro inesperado ao tentar excluir a conta. Tente novamente mais tarde.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => setShowConfirm(true);

  const confirmDeletion = async () => {
    setShowConfirm(false);
    await handleDelete();
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post("/logout");
      logout(); // limpa frontend
      setIsOpen(false);
    } catch (error) {
      showToast("Erro ao efetuar logout, tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fechar modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!user)
    return (
      <div>
        <p>Nenhum usuário logado.</p>
      </div>
    );

  return (
    <div className="user-modal-wrapper">
      <FiUser
        className="user-icon-btn"
        size={30}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* Modal */}
      {isOpen && (
        <div className="user-modal" ref={modalRef}>
          <div className="user-card">
            <div className="user-info">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <>
                  <h2 className="user-name">{user.name}</h2>
                  <div className="user-detail">
                    <span className="user-data">Email: </span>
                    <span>{user.email}</span>
                  </div>
                  {user.created_at && (
                    <div className="user-detail">
                      <span className="user-data">Data de cadastro: </span>
                      <span>
                        {new Date(user.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="user-actions">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <button className="delete-btn" onClick={handleDeleteClick}>
                Excluir conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <ConfirmModal
          message="Tem certeza que deseja excluir sua conta?"
          onConfirm={confirmDeletion}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default UserModal;
