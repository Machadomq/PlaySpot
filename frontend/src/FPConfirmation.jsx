import 'bootstrap/dist/css/bootstrap.min.css';
import './FPConfirmation.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FPConfirmation() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-container">
      <header className="confirmation-header">
        <p className="titulo" onClick={handleTitleClick}>PlaySpot</p>
      </header>
      <div id='main'>
        <div className="confirmation-content">
          <h1 id='titEnv'>Email de Recuperação Enviado!</h1>
          <p id='parEnv'>Verifique seu email para as instruções de recuperação de senha.</p>
          <button onClick={handleBackToLogin} className="btn btn-primary btn-block">Voltar ao Login</button>
        </div>
      </div>
    </div>
  );
}

export default FPConfirmation;