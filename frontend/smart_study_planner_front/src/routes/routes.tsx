import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/home";
import Sobre from "../pages/Sobre/sobre";
import LoginPage from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotesPage from "../pages/Notes/Notes";
import { Tasks } from "../pages/Tasks/Tasks";
import ProtectedRoute from "./ProtectedRoute";
import TaskTimeline from "../pages/TaskTimeline/TaskTimeline";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "../pages/ResetPassword/ResetPassword";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Sobre />}/>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>}/>
      <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>}/>
      <Route path="/timeline" element={<ProtectedRoute><TaskTimeline /></ProtectedRoute>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/register" element={<Register/>}/>
    {/* 
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/subjects" element={<SubjectsPage />} /> 
    */}
    {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
