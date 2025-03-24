import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import userIcon from './assets/userIcon2.png'; 

function RegisterPage() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/register-confirmation');
  };

  return (
    <div className="RegisterPage-container">
      <header className="register-header">
        <p className="titulo" onClick={handleTitleClick}>PlaySpot</p>
      </header>
      <div className="register-content">
        <img src={userIcon} alt="User Icon" className="userIcon" />
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Nome" />
              </div>
              <div className="form-group">
                <input type="date" className="form-control" placeholder="Data de Nascimento" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="CPF" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Telefone" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Endereço" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Cadastrar senha" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Confirmar senha" />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;