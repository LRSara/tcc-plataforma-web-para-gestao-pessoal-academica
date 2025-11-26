import React from "react";

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Carregando..." }: LoadingProps) {
  return (
    <div style={styles.loading_overlay}>
      <div style={styles.loading_container}>
        <div style={styles.loading_spinner}></div>
        <p style={styles.loading_text}>{text}</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  loading_overlay: {
    position: "fixed", // <-- alterado de absolute para fixed
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(253, 239, 230, 0.39)", // use rgba direto
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  loading_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  loading_spinner: {
    width: 50,
    height: 50,
    border: "6px solid #CDA4FF",
    borderTop: "6px solid #313030",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loading_text: {
    fontSize: 14,
    fontWeight: 500,
    color: "#313030",
  },
};

// Adiciona animação global
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);
