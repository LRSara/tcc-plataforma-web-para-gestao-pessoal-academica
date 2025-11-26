import React, { useState } from "react";
import "./styles.css"; // importando o CSS externo
import { useNavigate } from "react-router-dom";

export default function Sobre() {
  const features = [
    {
      title: "Tarefas,",
      description: "Organize suas tarefas diárias com facilidade.",
      color: "#FFD6A5", // pastel laranja
    },
    {
      title: "Prazos",
      description: "Acompanhe todos os prazos e deadlines importantes.",
      color: "#FDFFB6", // pastel amarelo
    },
    {
      title: "& Resumos",
      description: "Crie e armazene resumos das suas matérias.",
      color: "#CAFFBF", // pastel verde
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate()

  return (
    <div className="home">
      <header>
        <nav className="nav-bar">
          <a href="/login">Login</a>
          <a href="#oque">O que é</a>
          <a href="#funcionalidades">Funcionalidades</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo(a) ao seu espaço de estudos!</h1>
          <p>
            Organize suas tarefas, planeje seus projetos e alcance seus objetivos
            de forma prática e eficiente.
          </p>
          <button className="btn-comecar" onClick={()=>navigate("/register")}>Começar</button>
        </div>
      </section>

      <section className="about" id="oque">
        <div className="about-text">
          <h2>O que é o SmartStudy ?</h2>
          <p>
            Estudar pode ser mais leve e organizado. Aqui, você encontra um
            espaço feito para planejar seus estudos, acompanhar suas tarefas e
            manter o foco no que realmente importa. Personalize do seu jeito e
            construa o seu caminho para o sucesso!
          </p>
        </div>
      </section>

      <section className="features" id="funcionalidades">
        {features.map((f, idx) => {
          const isActive = hoveredIndex === idx || selectedIndex === idx;
          return (
            <div
              key={idx}
              className={`feature-card ${isActive ? "active" : ""}`}
              style={{ "--hover-color": f.color } as React.CSSProperties}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() =>
                setSelectedIndex(selectedIndex === idx ? null : idx)
              }
            >
              <span className="feature-title">{f.title}</span>
              <p className="feature-description">{f.description}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
