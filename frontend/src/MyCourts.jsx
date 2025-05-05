import 'bootstrap/dist/css/bootstrap.min.css';
import './MyCourts.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Descomente se for buscar dados de uma API

function MyCourts() {
    const navigate = useNavigate();
    const [courts, setCourts] = useState([]); // Estado para armazenar as quadras

    // Simulação de busca de dados (substituir pela chamada real à API)
    useEffect(() => {
        // Exemplo de dados fictícios
        const dummyCourts = [
            { id: 1, nomeQuadra: 'Quadra Central', esporte: 'Futebol Society', cidade: 'São Paulo', bairro: 'Centro' },
            { id: 2, nomeQuadra: 'Quadra Lateral', esporte: 'Vôlei de Praia', cidade: 'Rio de Janeiro', bairro: 'Copacabana' },
            { id: 3, nomeQuadra: 'Ginásio Principal', esporte: 'Basquete', cidade: 'Belo Horizonte', bairro: 'Savassi' },
        ];
        setCourts(dummyCourts);

        /*
        // Exemplo de como buscar dados de uma API (descomentar axios e ajustar URL)
        const fetchCourts = async () => {
            try {
                // const response = await axios.get('http://localhost:8080/api/quadras'); // Ajuste a URL da sua API
                // setCourts(response.data);
            } catch (error) {
                console.error('Erro ao buscar quadras:', error);
            }
        };
        fetchCourts();
        */
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
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
                <button className="hotbar-item" onClick={() => handleNavigation('/')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/courts')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Suporte</button>
            </div>

            {/* Conteúdo Principal */}
            <div className="workbench-content">
                <h1 className="left-aligned">Minhas Quadras</h1>
                <p className="left-aligned">Gerencie suas quadras cadastradas.</p>
                <div className="linha-branca">­</div>

                <div className="courts-list-container">
                    {courts.length > 0 ? (
                        courts.map(court => (
                            <div key={court.id} className="court-card">
                                <h2>{court.nomeQuadra}</h2>
                                <p><strong>Esporte:</strong> {court.esporte}</p>
                                <p><strong>Localização:</strong> {court.cidade} - {court.bairro}</p>
                                <div className="card-actions">
                                    {/* Adicionar botões de ação (Editar, Excluir) se necessário */}
                                    {/* <button className="btn btn-sm btn-primary">Editar</button> */}
                                    {/* <button className="btn btn-sm btn-danger">Excluir</button> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhuma quadra cadastrada ainda.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyCourts;

