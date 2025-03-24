import 'bootstrap/dist/css/bootstrap.min.css';
import './ForgotPass.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/fp-confirmation');
  };

  return (
    <div className="UserProfile-container">
      <header className="login-header">
        <p className="titulo">PlaySpot</p>
      </header>
      <div id='main'>
        <div className="recover-content">
          <h1>Esqueceu sua senha?</h1>
          <p>Informe seu email abaixo. Você receberá um email de recuperação de senha.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Digite seu email" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;