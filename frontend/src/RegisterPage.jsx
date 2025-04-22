import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userIcon from './assets/userIcon2.png';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    endereco: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/cadastrar', formData);
      console.log('Usuário cadastrado:', response.data);
      navigate('/register-confirmation');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao cadastrar usuário');
    }
  };

  const handleTitleClick = () => {
    navigate('/');
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
                <input
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="dataNascimento"
                  className="form-control"
                  placeholder="Data de Nascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cpf"
                  className="form-control"
                  placeholder="CPF"
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="telefone"
                  className="form-control"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="endereco"
                  className="form-control"
                  placeholder="Endereço"
                  value={formData.endereco}
                  onChange={handleChange}
                />
              </div>
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
                  placeholder="Cadastrar senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmarSenha"
                  className="form-control"
                  placeholder="Confirmar senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                />
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