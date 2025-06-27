import React from 'react';
import { useNavigate } from 'react-router-dom';

function SupportScreen() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    // Informações de contato (podem vir de uma configuração ou API no futuro)
    const supportEmail = "suporte@playspot.com.br";
    const supportPhone = "(XX) YYYYY-ZZZZ";

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
                    </div>
                </div>
            </header>

            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto py-4">
                        <button 
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => handleNavigation('/MyCourts')}
                        >
                            Minhas Quadras
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
                            Reservas
                        </button>
                        <button 
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => handleNavigation('/FinancialScreen')}
                        >
                            Financeiro
                        </button>
                        <button 
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => handleNavigation('/my-account')}
                        >
                            Minha conta
                        </button>
                        <button 
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-400 bg-gray-700 rounded-lg"
                            onClick={() => handleNavigation('/SupportScreen')}
                        >
                            Suporte
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Suporte ao Cliente</h1>
                    <p className="text-gray-300">Precisa de ajuda? Entre em contato conosco!</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">Entre em Contato</h2>
                    <p className="text-gray-300 mb-8">
                        Se você tiver qualquer dúvida, problema ou sugestão, nossa equipe de suporte está pronta para ajudar.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">E-mail</h3>
                            </div>
                            <p className="text-gray-300 mb-3">
                                Para questões gerais, feedback ou suporte técnico, envie um e-mail para:
                            </p>
                            <p className="mb-3">
                                <a 
                                    href={`mailto:${supportEmail}`} 
                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    {supportEmail}
                                </a>
                            </p>
                            <p className="text-sm text-gray-500">
                                Nosso objetivo é responder a todos os e-mails em até 24 horas úteis.
                            </p>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">Telefone</h3>
                            </div>
                            <p className="text-gray-300 mb-3">
                                Para assistência imediata ou questões urgentes, você pode nos ligar no número:
                            </p>
                            <p className="text-lg font-medium text-white mb-3">{supportPhone}</p>
                            <p className="text-sm text-gray-500">
                                Nosso atendimento telefônico está disponível de Segunda a Sexta, das 09:00 às 18:00.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-blue-900 rounded-lg">
                        <p className="text-blue-200 text-sm">
                            <strong>Dica:</strong> Ao entrar em contato, por favor, forneça o máximo de detalhes possível sobre sua solicitação para que possamos ajudá-lo de forma eficiente.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SupportScreen;

