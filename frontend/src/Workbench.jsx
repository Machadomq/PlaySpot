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
        <button className="hotbar-item" onClick={() => handleNavigation('/')}>Início</button>
        <button className="hotbar-item" onClick={() => handleNavigation('/courts')}>Quadras</button>
        <button className="hotbar-item" onClick={() => handleNavigation('/login')}>Login</button>
        <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Cadastro</button>
      </div>
      <div className="workbench-content">
        <header className="workbench-header">
          <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
        </header>
        <main className="workbench-main">

        </main>
      </div>
    </div>
  );
}

export default Workbench;