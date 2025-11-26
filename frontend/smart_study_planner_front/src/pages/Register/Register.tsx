import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { createResource } from "../../services/resource";
import { Register as RegisterBody} from "../../services/models/Register";
import { useToast } from "../../components/ui/ToastProvider";
import { error } from "console";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const body: RegisterBody = {
      name,
      email,
      password,
    };
    try {

      const response = await createResource<RegisterBody>("register", body);
      setLoading(false);
      showToast(`Usuário ${name} cadastrado com sucesso!`, "success");
      navigate("/login");
  
    } catch (error: any) {    
      setLoading(false); 
        // Status 409 = usuário já existe
        if (error.response?.status === 409) {
          showToast("Esse usuário já existe", "error");
          return;
        }
        // Qualquer outro erro
        showToast("Erro ao criar usuário", "error");
        console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
