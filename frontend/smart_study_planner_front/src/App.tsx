import React from "react";
import AppRoutes from "./routes/routes";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar";
import { ToastProvider } from "./components/ui/ToastProvider";
import { useLocation } from "react-router-dom";
import "./App.css";

function App() {
  const location = useLocation(); // <-- pega a rota atual

  const isSobrePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isForgotPage = location.pathname === "/forgot-password";
  const isResetPage = location.pathname === "/reset-password";

  const withoutBar = !isSobrePage && !isRegisterPage && !isLoginPage && !isResetPage && !isForgotPage;

  return (
    <div>
        <ToastProvider>
          {withoutBar && <NavBar />}
          {withoutBar && <SideBar />}

          {withoutBar ? (
            <div className="containerA">
              <AppRoutes />
            </div>
          ) : (
            <AppRoutes />   
          )}
        </ToastProvider>
    </div>
  );
}

export default App;
