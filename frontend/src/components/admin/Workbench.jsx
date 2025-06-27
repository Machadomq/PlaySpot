import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '../both/AuthComponents';

function Workbench() {
  const navigate = useNavigate();
  const { isAdmin, isProprietario } = useUserType();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 
              className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate('/')}
            >
              PlaySpot
            </h1>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm font-medium">
                {isAdmin ? 'Administrador' : isProprietario ? 'Proprietário' : 'Cliente'}
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {/* Funcionalidades para proprietários e admins */}
            {(isProprietario || isAdmin) && (
              <>
                <button 
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => handleNavigation('/MyCourts')}
                >
                  {isAdmin ? 'Todas as Quadras' : 'Minhas Quadras'}
                </button>
                <button 
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => handleNavigation('/Registration-courts')}
                >
                  Cadastrar Quadra
                </button>
                <button 
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => handleNavigation('/BookingsScreen')}
                >
                  {isAdmin ? 'Todas as Reservas' : 'Minhas Reservas'}
                </button>
                <button 
                  className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => handleNavigation('/FinancialScreen')}
                >
                  Financeiro
                </button>
              </>
            )}
            
            {/* Funcionalidades exclusivas para admins */}
            {isAdmin && (
              <button 
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => handleNavigation('/AdminPanel')}
              >
                Painel Admin
              </button>
            )}
            
            {/* Funcionalidades comuns */}
            <button 
              className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => handleNavigation('/my-account')}
            >
              Minha conta
            </button>
            <button 
              className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => handleNavigation('/SupportScreen')}
            >
              Suporte
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bem-vindo ao PlaySpot
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Gerencie suas quadras e reservas de forma simples e eficiente
          </p>
          
          {(isProprietario || isAdmin) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:bg-gray-750 transition-colors">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isAdmin ? 'Todas as Quadras' : 'Minhas Quadras'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Visualize e gerencie suas quadras esportivas
                </p>
                <button 
                  onClick={() => handleNavigation('/MyCourts')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Acessar
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:bg-gray-750 transition-colors">
                <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cadastrar Quadra</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Adicione novas quadras ao sistema
                </p>
                <button 
                  onClick={() => handleNavigation('/Registration-courts')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Cadastrar
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:bg-gray-750 transition-colors">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isAdmin ? 'Todas as Reservas' : 'Minhas Reservas'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Gerencie reservas e agendamentos
                </p>
                <button 
                  onClick={() => handleNavigation('/BookingsScreen')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Ver Reservas
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:bg-gray-750 transition-colors">
                <div className="w-12 h-12 bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Financeiro</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Acompanhe receitas e relatórios financeiros
                </p>
                <button 
                  onClick={() => handleNavigation('/FinancialScreen')}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Ver Financeiro
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Workbench;