import 'bootstrap/dist/css/bootstrap.min.css';
import './MyAccountScreen.css'; // Estilo específico para esta tela
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyAccountScreen() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nome: '',
        nascimento: '',
        email: '',
        telefone: '', // Adicionado, comum em contas de usuário
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        senhaAtual: '', // Para confirmação ao mudar senha
        novaSenha: '',
        confirmarNovaSenha: ''
    });

    // Simulação de carregamento de dados do usuário (substituir pela chamada real à API)
    useEffect(() => {
        const dummyUserData = {
            nome: 'Usuário Exemplo',
            nascimento: '1990-01-15',
            email: 'usuario@exemplo.com',
            telefone: '(11) 98765-4321',
            cep: '01001-000',
            rua: 'Praça da Sé',
            numero: '100',
            complemento: 'Lado A',
            bairro: 'Sé',
            cidade: 'São Paulo',
            estado: 'SP',
        };
        setUserData(prevData => ({ ...prevData, ...dummyUserData }));
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de validação e envio para API (a ser implementada)
        if (userData.novaSenha && userData.novaSenha !== userData.confirmarNovaSenha) {
            alert('As novas senhas não coincidem!');
            return;
        }
        console.log('Dados do usuário para salvar:', userData);
        alert('Dados salvos com sucesso! (Simulação)');
        // Limpar campos de senha após salvar (opcional)
        setUserData(prevData => ({ 
            ...prevData, 
            senhaAtual: '', 
            novaSenha: '', 
            confirmarNovaSenha: '' 
        }));
    };

    return (
        <div className="MyAccountScreenContainer">
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
                <h1 className="left-aligned">Minha Conta</h1>
                <p className="left-aligned">Atualize suas informações pessoais e de acesso.</p>
                <div className="linha-branca">­</div>

                <form className="my-account-form" onSubmit={handleSubmit}>
                    <h2>Dados Pessoais</h2>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome Completo</label>
                            <input type="text" id="nome" name="nome" value={userData.nome} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nascimento">Data de Nascimento</label>
                            <input type="date" id="nascimento" name="nascimento" value={userData.nascimento} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" value={userData.telefone} onChange={handleChange} className="form-control" placeholder="(XX) XXXXX-XXXX" />
                        </div>
                    </div>

                    <h2>Endereço</h2>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="cep">CEP</label>
                            <input type="text" id="cep" name="cep" value={userData.cep} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="rua">Rua</label>
                            <input type="text" id="rua" name="rua" value={userData.rua} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="numero">Número</label>
                            <input type="text" id="numero" name="numero" value={userData.numero} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" id="complemento" name="complemento" value={userData.complemento} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="bairro">Bairro</label>
                            <input type="text" id="bairro" name="bairro" value={userData.bairro} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="cidade">Cidade</label>
                            <input type="text" id="cidade" name="cidade" value={userData.cidade} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="estado">Estado</label>
                            <input type="text" id="estado" name="estado" value={userData.estado} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <h2>Alterar Senha</h2>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="senhaAtual">Senha Atual</label>
                            <input type="password" id="senhaAtual" name="senhaAtual" value={userData.senhaAtual} onChange={handleChange} className="form-control" placeholder="Deixe em branco se não for alterar" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="novaSenha">Nova Senha</label>
                            <input type="password" id="novaSenha" name="novaSenha" value={userData.novaSenha} onChange={handleChange} className="form-control" placeholder="Mínimo 6 caracteres" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
                            <input type="password" id="confirmarNovaSenha" name="confirmarNovaSenha" value={userData.confirmarNovaSenha} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success btn-block">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}

export default MyAccountScreen;

