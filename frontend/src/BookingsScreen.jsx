import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingsScreen.css'; // Estilo específico para esta tela
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingsScreen() {
    const navigate = useNavigate();
    const [currentBookings, setCurrentBookings] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [historyFilters, setHistoryFilters] = useState({ date: '', status: '' });

    // Busca reservas reais da API para o usuário autenticado
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        fetch(`http://localhost:8080/api/reservas/usuario/${userId}`)
            .then(response => response.json())
            .then(data => {
                const mapped = (data || []).map(r => ({
                    id: r.reservaId,
                    courtName: r.quadra?.nomeQuadra || 'Quadra',
                    date: r.dataReserva ? new Date(r.dataReserva).toLocaleDateString('pt-BR') : '',
                    time: r.horarioInicio ? r.horarioInicio : '',
                    status: r.status || '',
                    value: r.valorTotal ? `R$ ${Number(r.valorTotal).toFixed(2).replace('.', ',')}` : ''
                }));

                const current = mapped.filter(b => b.status !== 'CANCELADA');
                setCurrentBookings(current);
                setBookingHistory(mapped);
            })
            .catch(err => {
                console.error('Erro ao buscar reservas:', err);
            });
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
                <button className="hotbar-item" onClick={() => handleNavigation('/my-courts')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/bookings')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/financial')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/support')}>Suporte</button>
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

