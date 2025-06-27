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
      
      // Armazena informações do usuário no localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      localStorage.setItem('userId', response.data.user.idUser);
      localStorage.setItem('userType', response.data.user.tipoCliente);
      localStorage.setItem('canAccessWorkbench', response.data.canAccessWorkbench);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      localStorage.setItem('isProprietario', response.data.isProprietario);
      
      alert('Login realizado com sucesso!');
      
      // Redireciona baseado no tipo de usuário
      if (response.data.canAccessWorkbench) {
        navigate('/workbench');
      } else {
        navigate('/'); // Usuários básicos voltam para a página inicial
      }
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
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 
          className="text-center text-3xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors mb-8"
          onClick={handleTitleClick}
        >
          PlaySpot
        </h1>
        <img 
          src={userIcon1} 
          alt="User Icon" 
          className="mx-auto w-20 h-20 rounded-full shadow-lg mb-6" 
        />
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          Entre na sua conta
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 border border-gray-700 rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                name="senha"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>
            
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                onClick={handleForgotPasswordClick}
              >
                Esqueceu a senha?
              </button>
            </div>
            
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors"
            >
              Entrar
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Não possui conta? 
              <button 
                onClick={handleRegisterClick} 
                className="ml-1 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;