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
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-400 bg-gray-700 rounded-lg"
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
                    <h1 className="text-3xl font-bold text-white mb-2">Minhas Reservas</h1>
                    <p className="text-gray-300">Visualize suas reservas atuais e o histórico.</p>
                </div>

                <section className="mb-12">
                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Reservas Atuais/Próximas</h2>
                    {currentBookings.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {currentBookings.map(booking => (
                                <div key={booking.id} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">{booking.courtName}</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Data:</span> {booking.date}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Horário:</span> {booking.time}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Status:</span> 
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                                booking.status === 'Confirmada' ? 'bg-green-900 text-green-200' :
                                                booking.status === 'Pendente' ? 'bg-yellow-900 text-yellow-200' :
                                                'bg-gray-700 text-gray-200'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Valor:</span> {booking.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
                            <p className="text-gray-500">Nenhuma reserva atual ou próxima.</p>
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Histórico de Reservas</h2>
                    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Filtrar por data</label>
                                <input 
                                    type="date" 
                                    name="date" 
                                    value={historyFilters.date} 
                                    onChange={handleFilterChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Filtrar por status</label>
                                <select 
                                    name="status" 
                                    value={historyFilters.status} 
                                    onChange={handleFilterChange} 
                                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                                >
                                    <option value="">Todos os Status</option>
                                    <option value="Concluída">Concluída</option>
                                    <option value="Cancelada">Cancelada</option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Confirmada">Confirmada</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {filteredHistory.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredHistory.map(booking => (
                                <div key={booking.id} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow opacity-90">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">{booking.courtName}</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Data:</span> {booking.date}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Horário:</span> {booking.time}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Status:</span> 
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                                booking.status === 'Concluída' ? 'bg-green-900 text-green-200' :
                                                booking.status === 'Cancelada' ? 'bg-red-900 text-red-200' :
                                                booking.status === 'Pendente' ? 'bg-yellow-900 text-yellow-200' :
                                                'bg-gray-700 text-gray-200'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Valor:</span> {booking.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
                            <p className="text-gray-500">Nenhum histórico de reserva encontrado com os filtros aplicados.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default BookingsScreen;

