import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 
          className="text-center text-3xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors mb-8"
          onClick={() => navigate('/')}
        >
          PlaySpot
        </h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 border border-gray-700 rounded-lg sm:px-10 text-center">
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">Registro Concluído!</h1>
          <p className="text-gray-300 mb-8">
            Seu registro foi realizado com sucesso. Você já pode fazer login.
          </p>
          
          <button 
            onClick={() => navigate('/login')} 
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterConfirmation;