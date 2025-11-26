import { useState, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css"; // importa o CSS
import Loading from "../../components/ui/Loading";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !email) {
      setMessage("Token ou e-mail ausentes.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      const data: { message: string } = await res.json();
      setMessage(data.message);
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      setMessage("Ocorreu um erro ao redefinir a senha.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      {loading && <Loading />}
      <div className="reset-form">
        <h1>Redefinir Senha</h1>

        {message && (
          <div className="message-container">
            <p>{message}</p>
            {submitted && (
              <button onClick={() => navigate("/login")}>
                Voltar para o login
              </button>
            )}
          </div>
        )}

        {!submitted && (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirme a senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            <button type="submit">Redefinir Senha</button>
          </form>
        )}
      </div>
    </div>
  );
}
