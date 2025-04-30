import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userIcon1 from './assets/userIcon2.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', formData);
      console.log('Login realizado:', response.data);
      alert('Login realizado com sucesso!');
      navigate('/workbench'); // Redireciona para a página de dashboard
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

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
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="senha"
                className="form-control"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-link forgot-password"
                onClick={handleForgotPasswordClick}
              >
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