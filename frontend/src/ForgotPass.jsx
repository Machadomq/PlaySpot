import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/fp-confirmation');
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
        <h2 className="text-center text-2xl font-bold text-white mb-2">
          Esqueceu sua senha?
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Informe seu email abaixo. Você receberá um email de recuperação de senha.
        </p>
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
                name="email"
                type="email" 
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                placeholder="Digite seu email" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors"
            >
              Enviar
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Voltar ao login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;