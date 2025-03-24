import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterConfirmation.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <header className="confirmation-header">
        <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
      </header>
      <div id='main'>
        <div className="confirmation-content">
          <h1>Registro Concluído!</h1>
          <p>Seu registro foi realizado com sucesso. Você já pode fazer login.</p>
          <button onClick={() => navigate('/login')} className="btn btn-primary btn-block">Fazer Login</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterConfirmation;