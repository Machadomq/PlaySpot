import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserType } from '../both/AuthComponents';

function RegistrationCourts() {
    const navigate = useNavigate();
    const { isAdmin, isProprietario, userId } = useUserType();
    const [formData, setFormData] = useState({
        nomeQuadra: '',
        esporte: '',
        valorHora: '',
        telefone: '',
        cep: '',
        estado: '',
        bairro: '',
        rua: '',
        numero: '',
        cidade: '',
        idProprietario: userId
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verifica se o usuário tem permissão para cadastrar quadras
        if (!isAdmin && !isProprietario) {
            alert('Acesso negado. Apenas proprietários e administradores podem cadastrar quadras.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8080/api/quadras/cadastrar', formData, {
                headers: {
                    'userId': userId
                }
            });
            console.log('Quadra cadastrada:', response.data);
            alert('Quadra cadastrada com sucesso!');
            navigate('/MyCourts');
        } catch (error) {
            console.error('Erro ao cadastrar quadra:', error.response?.data || error.message);
            if (error.response && error.response.status === 403) {
                alert('Acesso negado. Você não tem permissão para cadastrar quadras.');
            } else {
                alert('Erro ao cadastrar quadra. Tente novamente.');
            }
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
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
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-400 bg-gray-700 rounded-lg"
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
                    <h1 className="text-3xl font-bold text-white mb-2">Cadastro de Quadra</h1>
                    <p className="text-gray-300">Preencha as informações e cadastre seu novo ponto de reserva</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Quadra</label>
                                    <input
                                        type="text"
                                        name="nomeQuadra"
                                        value={formData.nomeQuadra}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Digite o nome da quadra"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Esporte</label>
                                    <input
                                        type="text"
                                        name="esporte"
                                        value={formData.esporte}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Futebol, Vôlei, Basquete"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Valor por Hora (R$)</label>
                                    <input
                                        type="number"
                                        name="valorHora"
                                        value={formData.valorHora}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                                    <input
                                        type="text"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="(11) 99999-9999"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">CEP</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={formData.cep}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="00000-000"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                                    <input
                                        type="text"
                                        name="estado"
                                        value={formData.estado}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: São Paulo"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={formData.cidade}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Santos"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        value={formData.bairro}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Centro"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Rua</label>
                                    <input
                                        type="text"
                                        name="rua"
                                        value={formData.rua}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Rua das Flores"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Número</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="123"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button 
                                type="submit" 
                                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Cadastrar Quadra
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default RegistrationCourts;