import 'bootstrap/dist/css/bootstrap.min.css';
import './ForgotPass.css'; 
import React from 'react';

function ForgotPass() {
  return (
    <div className="UserProfile-container">
      <header className="login-header">
        <p className="titulo">PlaySpot</p>
      </header>
      <div id='main'>
        <div className="recover-content">
            <h1>Esqueceu sua senha?</h1>
            <p>Informe seu email abaixo. Você receberá um email de recuperação de senha.</p>
          <form className="login-form">
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