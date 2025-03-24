import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import userIcon1 from './assets/userIcon2.png';

function Login() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/RegisterPage');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div className="UserProfile-container">
      <header className="login-header">
        <p className="titulo" onClick={handleTitleClick}>PlaySpot</p>
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
              <button type="button" className="btn btn-link forgot-password" onClick={handleForgotPasswordClick}>
                Esqueceu a senha?
              </button>
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
          </form>
          <div className="signup-link">
            <p>Não possui conta? <button onClick={handleRegisterClick} className="btn btn-link">Cadastre-se</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;