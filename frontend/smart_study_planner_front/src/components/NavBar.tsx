import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import UserModal from "./ui/UserModal/UserModal";

export default function NavBar() {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}></div>
      <div style={styles.profile}>
        <UserModal />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    width: "100%",
    borderBottom: "1px solid black",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // separa logo e perfil
    padding: "0 40px", // cria espaço nas laterais
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 1000,
    // backgroundColor: "white", // pra não ficar transparente ao rolar
    backgroundColor: '#fdefe3',
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  profile: {
    fontSize: "18px",
  },
  user: {
    cursor: 'pointer',
  }
};
