import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rotas que requerem acesso ao workbench
export const ProtectedWorkbenchRoute = ({ children }) => {
  const canAccessWorkbench = localStorage.getItem('canAccessWorkbench') === 'true';
  
  if (!canAccessWorkbench) {
    alert('Acesso negado. Apenas proprietários e administradores podem acessar o workbench.');
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Componente para proteger rotas que requerem privilégios de admin
export const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    alert('Acesso negado. Apenas administradores podem acessar esta área.');
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Componente para verificar se usuário está logado
export const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    alert('Você precisa fazer login para acessar esta página.');
    return <Navigate to="/Login" replace />;
  }
  
  return children;
};

// Hook para verificar tipo de usuário
export const useUserType = () => {
  const userType = localStorage.getItem('userType');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isProprietario = localStorage.getItem('isProprietario') === 'true';
  const canAccessWorkbench = localStorage.getItem('canAccessWorkbench') === 'true';
  const userId = localStorage.getItem('userId');
  
  return {
    userType,
    isAdmin,
    isProprietario,
    canAccessWorkbench,
    userId: userId ? parseInt(userId) : null,
    isLoggedIn: !!userId
  };
};
