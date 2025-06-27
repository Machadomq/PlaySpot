import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserType } from './AuthComponents';

function MyCourts() {
    const navigate = useNavigate();
    const { isAdmin, isProprietario, userId } = useUserType();
    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados para o modal de edição
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentCourt, setCurrentCourt] = useState(null);
    const [editForm, setEditForm] = useState({
        nomeQuadra: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: '',
        esporte: '',
        telefone: '',
        valorHora: 0
    });

    // Estado para o modal de confirmação de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courtToDelete, setCourtToDelete] = useState(null);

    useEffect(() => {
        fetchCourts();
    }, []);
      const fetchCourts = async () => {
        try {
            let response;
            
            if (isAdmin) {
                // Admin pode ver todas as quadras
                response = await axios.get('http://localhost:8080/api/quadras', {
                    headers: {
                        'userId': userId
                    }
                });
            } else if (isProprietario) {
                // Proprietário só vê suas próprias quadras
                response = await axios.get(`http://localhost:8080/api/quadras/proprietario/${userId}`, {
                    headers: {
                        'userId': userId
                    }
                });
            } else {
                // Usuários comuns não deveriam estar aqui
                setError('Acesso negado');
                setLoading(false);
                return;
            }
            
            setCourts(response.data);
            setLoading(false);
            console.log('Quadras carregadas:', response.data);
        } catch (error) {
            console.error('Erro ao buscar quadras:', error);
            if (error.response && error.response.status === 403) {
                setError('Acesso negado. Você não tem permissão para visualizar essas quadras.');
            } else {
                setError('Não foi possível carregar as quadras. Tente novamente mais tarde.');
            }
            setLoading(false);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };
    
    // Função para abrir o modal de edição
    const handleEditCourt = (court) => {
        setCurrentCourt(court);
        setEditForm({
            nomeQuadra: court.nomeQuadra,
            estado: court.estado,
            cidade: court.cidade,
            bairro: court.bairro,
            rua: court.rua,
            numero: court.numero,
            cep: court.cep,
            esporte: court.esporte,
            telefone: court.telefone,
            valorHora: court.valorHora
        });
        setShowEditModal(true);
    };
    
    // Função para lidar com as mudanças nos campos do formulário
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: name === 'valorHora' ? parseFloat(value) : value
        });
    };
      // Função para salvar as alterações da quadra
    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/quadras/${currentCourt.idQuadra}`,
                { ...currentCourt, ...editForm },
                {
                    headers: {
                        'userId': userId
                    }
                }
            );
            
            if (response.status === 200) {
                // Atualiza a lista de quadras
                const updatedCourts = courts.map(court => 
                    court.idQuadra === currentCourt.idQuadra ? response.data : court
                );
                setCourts(updatedCourts);
                setShowEditModal(false);
                alert('Quadra atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar quadra:', error);
            alert('Erro ao atualizar quadra. Por favor, tente novamente.');
        }
    };
    
    // Função para abrir o modal de confirmação de exclusão
    const handleDeleteClick = (court) => {
        setCourtToDelete(court);
        setShowDeleteModal(true);
    };
      // Função para excluir a quadra
    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/quadras/${courtToDelete.idQuadra}`, {
                headers: {
                    'userId': userId
                }
            });
            
            if (response.status === 204) {
                // Remove a quadra excluída da lista
                const updatedCourts = courts.filter(court => court.idQuadra !== courtToDelete.idQuadra);
                setCourts(updatedCourts);
                setShowDeleteModal(false);
                alert('Quadra excluída com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao excluir quadra:', error);
            alert('Erro ao excluir quadra. Por favor, tente novamente.');
        }
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
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-400 bg-gray-700 rounded-lg"
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
                    <h1 className="text-3xl font-bold text-white mb-2">Minhas Quadras</h1>
                    <p className="text-gray-300">Gerencie suas quadras cadastradas.</p>
                </div>
                
                <div className="space-y-6">
                    {loading ? (
                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
                            <p className="text-gray-500">Carregando quadras...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                            <p className="text-red-200">{error}</p>
                        </div>
                    ) : courts.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {courts.map(court => (
                                <div key={court.idQuadra} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow">
                                    <h2 className="text-xl font-semibold text-white mb-4">{court.nomeQuadra}</h2>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Esporte:</span> {court.esporte}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Localização:</span> {court.cidade} - {court.bairro}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-medium">Valor/hora:</span> R$ {court.valorHora?.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            onClick={() => handleEditCourt(court)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                            onClick={() => handleDeleteClick(court)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
                            <p className="text-gray-500">Nenhuma quadra cadastrada ainda.</p>
                        </div>
                    )}
                </div>
            </main>
            
            {/* Modal de Edição */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-xl font-semibold text-white">Editar Quadra</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Quadra</label>
                                    <input
                                        type="text"
                                        name="nomeQuadra"
                                        value={editForm.nomeQuadra || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Esporte</label>
                                    <input
                                        type="text"
                                        name="esporte"
                                        value={editForm.esporte || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                                    <input
                                        type="text"
                                        name="estado"
                                        value={editForm.estado || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={editForm.cidade || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        value={editForm.bairro || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Rua</label>
                                    <input
                                        type="text"
                                        name="rua"
                                        value={editForm.rua || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Número</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={editForm.numero || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">CEP</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={editForm.cep || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                                    <input
                                        type="text"
                                        name="telefone"
                                        value={editForm.telefone || ''}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Valor por Hora</label>
                                    <input
                                        type="number"
                                        name="valorHora"
                                        value={editForm.valorHora || 0}
                                        onChange={handleEditFormChange}
                                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={handleSaveEdit}
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Modal de Confirmação de Exclusão */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-xl font-semibold text-white">Confirmar Exclusão</h2>
                        </div>
                        <div className="p-6">
                            {courtToDelete && (
                                <p className="text-gray-300">
                                    Tem certeza que deseja excluir a quadra <strong>{courtToDelete.nomeQuadra}</strong>? Esta ação não pode ser desfeita.
                                </p>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                onClick={handleConfirmDelete}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyCourts;

