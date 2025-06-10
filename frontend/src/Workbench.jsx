import 'bootstrap/dist/css/bootstrap.min.css';
import './Workbench.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserType } from './AuthComponents';

function Workbench() {
  const navigate = useNavigate();
  const { isAdmin, isProprietario, userId } = useUserType();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="workbench-container">
        <div className="hotbar-container">
            {/* Funcionalidades para proprietários e admins */}
            {(isProprietario || isAdmin) && (
              <>
                <button className="hotbar-item" onClick={() => handleNavigation('/MyCourts')}>
                  {isAdmin ? 'Todas as Quadras' : 'Minhas Quadras'}
                </button>
                <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>
                  Cadastrar Quadra
                </button>
                <button className="hotbar-item" onClick={() => handleNavigation('/BookingsScreen')}>
                  {isAdmin ? 'Todas as Reservas' : 'Minhas Reservas'}
                </button>
                <button className="hotbar-item" onClick={() => handleNavigation('/FinancialScreen')}>
                  Financeiro
                </button>
              </>
            )}
            
            {/* Funcionalidades exclusivas para admins */}
            {isAdmin && (
              <button className="hotbar-item" onClick={() => handleNavigation('/AdminPanel')}>
                Painel Admin
              </button>
            )}
            
            {/* Funcionalidades comuns */}
            <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>
              Minha conta
            </button>
            <button className="hotbar-item" onClick={() => handleNavigation('/SupportScreen')}>
              Suporte
            </button>
            <button className="hotbar-item logout-btn" onClick={handleLogout}>
              Sair
            </button>
        </div>
      <div className="workbench-content">
        <header className="workbench-header">
          <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
          <div className="user-info">
            <span>Usuário: {isAdmin ? 'Administrador' : isProprietario ? 'Proprietário' : 'Cliente'}</span>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Workbench;