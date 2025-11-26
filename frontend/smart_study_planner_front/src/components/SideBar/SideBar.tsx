import React, { useState } from "react";
import {
  FiCheckSquare,
  FiClock,
  FiPaperclip,
  FiMenu,
  FiHome,
} from "react-icons/fi";
import "./SideBar.css";

export default function SideBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* BOTÃO MOBILE FIXO (hamburger) */}
      <button className="mobile-floating-btn" onClick={toggleMenu}>
        <FiMenu size={26} />
      </button>

      {/* SIDEBAR WEB + MOBILE */}
      <div className={`sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="top">
          <button className="menu-button" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
        </div>

        <div className={`icon-container ${menuOpen ? 'opened' : 'closed'}`}>
          {menuOpen ? (
            <>
              <div className="icon">
                <a href="/home" className="link">
                  <FiHome size={24} />
                  <p className="label">Home</p>
                </a>
              </div>
              <div className="icon">
                <a href="/tasks" className="link">
                  <FiCheckSquare size={24} />
                  <p className="label">Tarefas</p>
                </a>
              </div>
              <div className="icon">
                <a href="/timeline" className="link">
                  <FiClock size={24} />
                  <p className="label">Prazos</p>
                </a>
              </div>
              <div className="icon">
                <a href="/notes" className="link">
                  <FiPaperclip size={24} />
                  <p className="label">Notas</p>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="icon"><FiHome size={24} /></div>
              <div className="icon"><FiCheckSquare size={24} /></div>
              <div className="icon"><FiClock size={24} /></div>
              <div className="icon"><FiPaperclip size={24} /></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
