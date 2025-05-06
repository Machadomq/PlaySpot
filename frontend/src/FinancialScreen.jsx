import 'bootstrap/dist/css/bootstrap.min.css';
import './FinancialScreen.css'; // Estilo específico para esta tela
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
        <div className="FinancialScreenContainer">
            <header className="workbench-header">
                <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
            </header>

            <div className="hotbar-container">
                <button className="hotbar-item" onClick={() => handleNavigation('/MyCourts')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/BookingsScreen')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/FinancialScreen')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/SupportScreen')}>Suporte</button>
            </div>

            <div className="workbench-content">
                <h1 className="left-aligned">Controle Financeiro</h1>
                <p className="left-aligned">Acompanhe seus recebimentos e o fluxo de caixa.</p>
                <div className="linha-branca">­</div>

                <div className="financial-controls">
                    <label htmlFor="month-select">Selecionar Mês:</label>
                    <input 
                        type="month" 
                        id="month-select" 
                        name="month-select"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="form-control filter-input"
                    />
                </div>

                {selectedMonth && monthlyData[selectedMonth] ? (
                    <>
                        <section className="financial-summary-section">
                            <h2>Resumo do Mês de {new Date(selectedMonth + '-02').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2> {/* Adiciona '-02' para evitar problemas com fuso horário ao formatar */} 
                            <div className="summary-card total-month-card">
                                <h3>Total Arrecadado no Mês</h3>
                                <p className="amount">R$ {currentMonthFinancials.totalMonth.toFixed(2).replace('.', ',')}</p>
                            </div>
                            <div className="weekly-summary">
                                {currentMonthFinancials.weeklyTotals.map((total, index) => (
                                    <div key={index} className="summary-card weekly-card">
                                        <h4>Semana {index + 1}</h4>
                                        <p className="amount">R$ {total.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                ))}
                                {currentMonthFinancials.weeklyTotals.length === 0 && <p>Nenhum dado semanal para este mês.</p>}
                            </div>
                        </section>

                        {/* <div className="linha-branca separadora">­</div>

                        <section className="transactions-section">
                            <h2>Detalhes das Transações do Mês</h2>
                            {currentMonthFinancials.transactions.length > 0 ? (
                                <ul className="transactions-list">
                                    {currentMonthFinancials.transactions.map(transaction => (
                                        <li key={transaction.id} className="transaction-item">
                                            <span>{new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span> 
                                            <span>{transaction.description}</span>
                                            <span className="amount">R$ {transaction.amount.toFixed(2).replace('.', ',')}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nenhuma transação registrada para este mês.</p>
                            )}
                        </section> */} 
                    </>
                ) : (
                    <p className="no-data-message">Selecione um mês para ver os dados financeiros ou não há dados para o mês selecionado.</p>
                )}
            </div>
        </div>
    );
}

export default FinancialScreen;

