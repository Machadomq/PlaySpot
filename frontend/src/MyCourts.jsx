import 'bootstrap/dist/css/bootstrap.min.css';
import './MyCourts.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando axios para fazer requisições HTTP
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function MyCourts() {
    const navigate = useNavigate();
    const [courts, setCourts] = useState([]); // Estado para armazenar as quadras
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para controlar erros
    
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
    const [courtToDelete, setCourtToDelete] = useState(null);    useEffect(() => {
        fetchCourts();
    }, []);
    
    const fetchCourts = async () => {
        try {
            // Faz a requisição para a API buscando todas as quadras
            const response = await axios.get('http://localhost:8080/api/quadras');
            
            // Atualiza o estado com os dados recebidos do banco de dados
            setCourts(response.data);
            setLoading(false);
            console.log('Quadras carregadas:', response.data);
        } catch (error) {
            console.error('Erro ao buscar quadras:', error);
            setError('Não foi possível carregar as quadras. Tente novamente mais tarde.');
            setLoading(false);
            
            // Dados fictícios para demonstração caso a API falhe
            const dummyCourts = [
                { id: 1, nomeQuadra: 'Quadra Central', esporte: 'Futebol Society', cidade: 'São Paulo', bairro: 'Centro' },
                { id: 2, nomeQuadra: 'Quadra Lateral', esporte: 'Vôlei de Praia', cidade: 'Rio de Janeiro', bairro: 'Copacabana' },
                { id: 3, nomeQuadra: 'Ginásio Principal', esporte: 'Basquete', cidade: 'Belo Horizonte', bairro: 'Savassi' },
            ];
            setCourts(dummyCourts);
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
                { ...currentCourt, ...editForm }
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
            const response = await axios.delete(`http://localhost:8080/api/quadras/${courtToDelete.idQuadra}`);
            
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
        <div className="MyCourtsContainer">
            {/* Cabeçalho Padrão */}
            <header className="workbench-header">
                <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
                {/* Adicionar ícone de usuário ou outras informações se necessário */}
            </header>

            {/* Barra Lateral Padrão */}
            <div className="hotbar-container">
                <button className="hotbar-item active" onClick={() => handleNavigation('/MyCourts')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/BookingsScreen')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/FinancialScreen')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/SupportScreen')}>Suporte</button>
            </div>

            {/* Conteúdo Principal */}
            <div className="workbench-content">
                <h1 className="left-aligned">Minhas Quadras</h1>
                <p className="left-aligned">Gerencie suas quadras cadastradas.</p>
                <div className="linha-branca">­</div>
                
                <div className="courts-list-container">
                    {loading ? (
                        <p className="loading-message">Carregando quadras...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>                    ) : courts.length > 0 ? (
                        courts.map(court => (
                            <div key={court.idQuadra} className="court-card">
                                <h2>{court.nomeQuadra}</h2>
                                <p><strong>Esporte:</strong> {court.esporte}</p>
                                <p><strong>Localização:</strong> {court.cidade} - {court.bairro}</p>
                                <p><strong>Valor/hora:</strong> R$ {court.valorHora?.toFixed(2)}</p><div className="card-actions">
                                    <button 
                                        className="btn btn-sm btn-primary" 
                                        onClick={() => handleEditCourt(court)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteClick(court)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma quadra cadastrada ainda.</p>
                    )}
                </div>            </div>
            
            {/* Modal de Edição */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Quadra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome da Quadra</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nomeQuadra" 
                                value={editForm.nomeQuadra || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Esporte</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="esporte" 
                                value={editForm.esporte || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="estado" 
                                value={editForm.estado || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="cidade" 
                                value={editForm.cidade || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="bairro" 
                                value={editForm.bairro || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Rua</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="rua" 
                                value={editForm.rua || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="numero" 
                                value={editForm.numero || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="cep" 
                                value={editForm.cep || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="telefone" 
                                value={editForm.telefone || ''} 
                                onChange={handleEditFormChange} 
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Valor por Hora</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="valorHora" 
                                value={editForm.valorHora || 0} 
                                onChange={handleEditFormChange} 
                                min="0" 
                                step="0.01" 
                                required 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Modal de Confirmação de Exclusão */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {courtToDelete && (
                        <p>Tem certeza que deseja excluir a quadra <strong>{courtToDelete.nomeQuadra}</strong>? Esta ação não pode ser desfeita.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyCourts;

