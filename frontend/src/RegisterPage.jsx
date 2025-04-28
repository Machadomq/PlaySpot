import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationCourts.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationCourts() {
    const navigate = useNavigate();
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
        cidade: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/quadras/cadastrar', formData);
            console.log('Quadra cadastrada:', response.data);
            // Redirecionar ou mostrar mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar quadra:', error.response?.data || error.message);
            // Mostrar mensagem de erro
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="RegistrationCourtsContainer">
            <header className="workbench-header">
                <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
            </header>

            <div className="hotbar-container">
                <button className="hotbar-item" onClick={() => handleNavigation('/')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/courts')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/RegisterPage')}>Suporte</button>
            </div>

            <div className="workbench-content">
                <h1>Cadastro de Quadra:</h1>
                <p>Preencha as informações e cadastre seu novo ponto de reserva</p>
                <div className="linha-branca"></div>

                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="nomeQuadra"
                                className="form-control"
                                placeholder="Nome da Quadra"
                                value={formData.nomeQuadra}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="esporte"
                                className="form-control"
                                placeholder="Esporte"
                                value={formData.esporte}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="number"
                                name="valorHora"
                                className="form-control"
                                placeholder="Valor da Hora"
                                value={formData.valorHora}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="telefone"
                                className="form-control"
                                placeholder="Telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="cep"
                                className="form-control"
                                placeholder="CEP"
                                value={formData.cep}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="estado"
                                className="form-control"
                                placeholder="Estado"
                                value={formData.estado}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="cidade"
                                className="form-control"
                                placeholder="Cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="bairro"
                                className="form-control"
                                placeholder="Bairro"
                                value={formData.bairro}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="rua"
                                className="form-control"
                                placeholder="Rua"
                                value={formData.rua}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                name="numero"
                                className="form-control"
                                placeholder="Número"
                                value={formData.numero}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Cadastrar Quadra</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationCourts;