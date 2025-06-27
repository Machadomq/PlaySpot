import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FinancialScreen() {
    const navigate = useNavigate();
    const [monthlyData, setMonthlyData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(''); // Formato YYYY-MM

    // Simulação de dados financeiros (substituir pela chamada real à API)
    useEffect(() => {
        const dummyFinancialData = {
            '2025-05': {
                totalMonth: 4200.00,
                weeklyTotals: [1300.00, 1350.00, 900.00, 750.00],
                transactions: [
                    { id: 1, date: '2025-05-02', description: 'Reserva Quadra Alpha', amount: 50.00 },
                    { id: 2, date: '2025-05-05', description: 'Reserva Quadra Beta', amount: 75.00 },
                    // ... mais transações
                ]
            },
            '2025-04': {
                totalMonth: 4550.00,
                weeklyTotals: [1250.00, 1400.00, 950.00, 850.00],
                transactions: [
                    { id: 3, date: '2025-04-10', description: 'Reserva Quadra Gamma', amount: 60.00 },
                    // ... mais transações
                ]
            }
        };
        // Define o mês atual como padrão ou o último mês com dados
        const today = new Date();
        const currentMonthYear = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        setSelectedMonth(dummyFinancialData[currentMonthYear] ? currentMonthYear : Object.keys(dummyFinancialData)[0] || '');
        setMonthlyData(dummyFinancialData);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const currentMonthFinancials = monthlyData[selectedMonth] || { totalMonth: 0, weeklyTotals: [], transactions: [] };

    return (
        <div className="min-h-screen bg-gray-900">
            <header className="bg-gray-800 shadow-sm border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 
                            className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-500 transition-colors"
                            onClick={() => navigate('/')}
                        >
                            PlaySpot
                        </h1>
                    </div>
                </div>
            </header>

            <nav className="bg-gray-800 shadow-sm">
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
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-400 bg-gray-700 rounded-lg"
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
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => handleNavigation('/SupportScreen')}
                        >
                            Suporte
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Controle Financeiro</h1>
                    <p className="text-gray-300">Acompanhe seus recebimentos e o fluxo de caixa.</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
                    <div className="max-w-xs">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Selecionar Mês:</label>
                        <input 
                            type="month" 
                            id="month-select" 
                            name="month-select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                        />
                    </div>
                </div>

                {selectedMonth && monthlyData[selectedMonth] ? (
                    <>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-6">
                                Resumo do Mês de {new Date(selectedMonth + '-02').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                            </h2>
                            
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white mb-6">
                                <h3 className="text-lg font-medium mb-2">Total Arrecadado no Mês</h3>
                                <p className="text-3xl font-bold">
                                    R$ {currentMonthFinancials.totalMonth.toFixed(2).replace('.', ',')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {currentMonthFinancials.weeklyTotals.map((total, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
                                        <h4 className="text-sm font-medium text-gray-300 mb-2">Semana {index + 1}</h4>
                                        <p className="text-xl font-semibold text-white">
                                            R$ {total.toFixed(2).replace('.', ',')}
                                        </p>
                                    </div>
                                ))}
                                {currentMonthFinancials.weeklyTotals.length === 0 && (
                                    <div className="col-span-full">
                                        <p className="text-gray-500 text-center py-8">Nenhum dado semanal para este mês.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Detalhes das Transações do Mês</h2>
                            {currentMonthFinancials.transactions.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-700">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Descrição</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-600">
                                            {currentMonthFinancials.transactions.map(transaction => (
                                                <tr key={transaction.id} className="hover:bg-gray-700">
                                                    <td className="px-4 py-3 text-sm text-gray-300">
                                                        {new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-300">{transaction.description}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-green-400 text-right">
                                                        R$ {transaction.amount.toFixed(2).replace('.', ',')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Nenhuma transação registrada para este mês.</p>
                                </div>
                            )}
                        </section>
                    </>
                ) : (
                    <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
                        <p className="text-gray-500">Selecione um mês para ver os dados financeiros ou não há dados para o mês selecionado.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default FinancialScreen;

