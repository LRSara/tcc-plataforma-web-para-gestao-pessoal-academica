import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: { message: string } = await res.json();

      setMessage(data.message);
      setSent(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Ocorreu um erro ao enviar o e-mail.");
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      {loading && <Loading/>}
      {!sent ? (
        <form onSubmit={handleSubmit} className="reset-form">
          <h2>Resetar Senha</h2>
          <p>Digite seu email para receber o link de redefinição de senha</p>
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Enviar Link
          </button>
          <a href="/login" className="login-link">
            Voltar para tela de login
          </a>
        </form>
      ) : (
        <div className="reset-message">
          <p>{message || "Verifique sua caixa de entrada para redefinir a senha."}</p>
          <button className="btn-secondary" onClick={() => navigate("/login")}>
            Voltar para Login
          </button>
        </div>
      )}
    </div>
  );
}
