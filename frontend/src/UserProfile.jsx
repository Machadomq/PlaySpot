import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import React from 'react';
import userIcon1 from './assets/userIcon2.png'

function UserProfile() {
  return (
    <div className="UserProfile-container">
      <header className="login-header">
        <p className="titulo">PlaySpot</p>
      </header>
      <div id='main'>
        <div className="login-content">
            <img src={userIcon1} alt="User Icon" className="userIcon1" />
            <form className="login-form">
            <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" placeholder="Senha" />
            </div>
            <div className="form-group">
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Entrar</button>
            </form>
            <div className="signup-link">
            <p>Não possui conta? <a href="#">Cadastre-se</a></p>
            </div>
        </div>
        </div>
    </div>
  );
}

export default UserProfile;