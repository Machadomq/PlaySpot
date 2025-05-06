import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingsScreen.css'; // Estilo específico para esta tela
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingsScreen() {
    const navigate = useNavigate();
    const [currentBookings, setCurrentBookings] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [historyFilters, setHistoryFilters] = useState({ date: '', status: '' });

    // Simulação de dados (substituir pela chamada real à API)
    useEffect(() => {
        const dummyCurrentBookings = [
            { id: 1, courtName: 'Quadra Alpha', date: '2025-05-10', time: '18:00', status: 'Confirmada', value: 'R$ 50,00' },
            { id: 2, courtName: 'Quadra Beta', date: '2025-05-12', time: '19:00', status: 'Pendente', value: 'R$ 75,00' },
        ];
        const dummyBookingHistory = [
            { id: 3, courtName: 'Quadra Gamma', date: '2025-04-20', time: '20:00', status: 'Concluída', value: 'R$ 60,00' },
            { id: 4, courtName: 'Quadra Alpha', date: '2025-04-15', time: '17:00', status: 'Cancelada', value: 'R$ 50,00' },
            { id: 5, courtName: 'Quadra Delta', date: '2025-03-30', time: '10:00', status: 'Concluída', value: 'R$ 90,00' },
        ];
        setCurrentBookings(dummyCurrentBookings);
        setBookingHistory(dummyBookingHistory);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleFilterChange = (e) => {
        setHistoryFilters({
            ...historyFilters,
            [e.target.name]: e.target.value
        });
    };

    const filteredHistory = bookingHistory.filter(booking => {
        return (
            (historyFilters.date ? booking.date.includes(historyFilters.date) : true) &&
            (historyFilters.status ? booking.status === historyFilters.status : true)
        );
    });

    return (
        <div className="BookingsScreenContainer">
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
                <h1 className="left-aligned">Minhas Reservas</h1>
                <p className="left-aligned">Visualize suas reservas atuais e o histórico.</p>
                <div className="linha-branca">­</div>

                <section className="bookings-section">
                    <h2>Reservas Atuais/Próximas</h2>
                    {currentBookings.length > 0 ? (
                        <div className="bookings-list">
                            {currentBookings.map(booking => (
                                <div key={booking.id} className="booking-card">
                                    <h3>{booking.courtName}</h3>
                                    <p><strong>Data:</strong> {booking.date}</p>
                                    <p><strong>Horário:</strong> {booking.time}</p>
                                    <p><strong>Status:</strong> <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                                    <p><strong>Valor:</strong> {booking.value}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhuma reserva atual ou próxima.</p>
                    )}
                </section>

                <div className="linha-branca separadora">­</div>

                <section className="bookings-section">
                    <h2>Histórico de Reservas</h2>
                    <div className="filters-container">
                        <input 
                            type="date" 
                            name="date" 
                            value={historyFilters.date} 
                            onChange={handleFilterChange} 
                            className="form-control filter-input"
                        />
                        <select 
                            name="status" 
                            value={historyFilters.status} 
                            onChange={handleFilterChange} 
                            className="form-control filter-input"
                        >
                            <option value="">Todos os Status</option>
                            <option value="Concluída">Concluída</option>
                            <option value="Cancelada">Cancelada</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Confirmada">Confirmada</option>
                        </select>
                    </div>
                    {filteredHistory.length > 0 ? (
                        <div className="bookings-list">
                            {filteredHistory.map(booking => (
                                <div key={booking.id} className="booking-card history-card">
                                    <h3>{booking.courtName}</h3>
                                    <p><strong>Data:</strong> {booking.date}</p>
                                    <p><strong>Horário:</strong> {booking.time}</p>
                                    <p><strong>Status:</strong> <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                                    <p><strong>Valor:</strong> {booking.value}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhum histórico de reserva encontrado com os filtros aplicados.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default BookingsScreen;

