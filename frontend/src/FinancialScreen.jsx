import 'bootstrap/dist/css/bootstrap.min.css';
import './FinancialScreen.css'; // Estilo específico para esta tela
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FinancialScreen() {
    const navigate = useNavigate();
    const [monthlyData, setMonthlyData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(''); // Formato YYYY-MM
    const [totalEarnings, setTotalEarnings] = useState(0);

    // Busca soma financeira do proprietário (total arrecadado)
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        // Pega total arrecadado do backend
        fetch(`http://localhost:8080/api/reservas/proprietario/${userId}/financeiro`)
            .then(response => response.json())
            .then(data => {
                const total = data?.totalArrecadado || 0;
                setTotalEarnings(Number(total));

                // Popula monthlyData com um node simples que usa totalEarnings no cartão principal
                const today = new Date();
                const currentMonthYear = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
                setSelectedMonth(currentMonthYear);
                setMonthlyData({
                    [currentMonthYear]: {
                        totalMonth: Number(total),
                        weeklyTotals: [],
                        transactions: []
                    }
                });
            })
            .catch(err => console.error('Erro ao buscar financeiro:', err));
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
                <button className="hotbar-item" onClick={() => handleNavigation('/my-courts')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/bookings')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/financial')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/support')}>Suporte</button>
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

