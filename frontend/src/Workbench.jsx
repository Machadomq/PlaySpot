import 'bootstrap/dist/css/bootstrap.min.css';
import './Workbench.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Workbench() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="workbench-container">
        <div className="hotbar-container">
            <button className="hotbar-item" onClick={() => handleNavigation('/MyCourts')}>Minhas Quadras</button>
            <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>Cadastrar Quadra</button>
            <button className="hotbar-item" onClick={() => handleNavigation('/BookingsScreen')}>Reservas</button>
            <button className="hotbar-item" onClick={() => handleNavigation('/FinancialScreen')}>Financeiro</button>
            <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>Minha conta</button>
            <button className="hotbar-item" onClick={() => handleNavigation('/SupportScreen')}>Suporte</button>
        </div>
      <div className="workbench-content">
        <header className="workbench-header">
          <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
        </header>
      </div>
    </div>
  );
}

export default Workbench;