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
                            className="whitespace-nowrap px-4 py-2 text-sm font-medium text-blue-400 bg-gray-700 rounded-lg"
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
                    <h1 className="text-3xl font-bold text-white mb-2">Minha Conta</h1>
                    <p className="text-gray-300">Atualize suas informações pessoais e de acesso.</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <section>
                            <h2 className="text-xl font-semibold text-gray-100 mb-6">Dados Pessoais</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
                                    <input 
                                        type="text" 
                                        id="nome" 
                                        name="nome" 
                                        value={userData.nome} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="nascimento" className="block text-sm font-medium text-gray-300 mb-2">Data de Nascimento</label>
                                    <input 
                                        type="date" 
                                        id="nascimento" 
                                        name="nascimento" 
                                        value={userData.nascimento} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={userData.email} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                                    <input 
                                        type="tel" 
                                        id="telefone" 
                                        name="telefone" 
                                        value={userData.telefone} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                        placeholder="(XX) XXXXX-XXXX" 
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-100 mb-6">Endereço</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="cep" className="block text-sm font-medium text-gray-300 mb-2">CEP</label>
                                    <input 
                                        type="text" 
                                        id="cep" 
                                        name="cep" 
                                        value={userData.cep} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="rua" className="block text-sm font-medium text-gray-300 mb-2">Rua</label>
                                    <input 
                                        type="text" 
                                        id="rua" 
                                        name="rua" 
                                        value={userData.rua} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="numero" className="block text-sm font-medium text-gray-300 mb-2">Número</label>
                                    <input 
                                        type="text" 
                                        id="numero" 
                                        name="numero" 
                                        value={userData.numero} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="complemento" className="block text-sm font-medium text-gray-300 mb-2">Complemento</label>
                                    <input 
                                        type="text" 
                                        id="complemento" 
                                        name="complemento" 
                                        value={userData.complemento} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bairro" className="block text-sm font-medium text-gray-300 mb-2">Bairro</label>
                                    <input 
                                        type="text" 
                                        id="bairro" 
                                        name="bairro" 
                                        value={userData.bairro} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                                    <input 
                                        type="text" 
                                        id="cidade" 
                                        name="cidade" 
                                        value={userData.cidade} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="estado" className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                                    <input 
                                        type="text" 
                                        id="estado" 
                                        name="estado" 
                                        value={userData.estado} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-100 mb-6">Alterar Senha</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="senhaAtual" className="block text-sm font-medium text-gray-300 mb-2">Senha Atual</label>
                                    <input 
                                        type="password" 
                                        id="senhaAtual" 
                                        name="senhaAtual" 
                                        value={userData.senhaAtual} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                        placeholder="Deixe em branco se não for alterar" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="novaSenha" className="block text-sm font-medium text-gray-300 mb-2">Nova Senha</label>
                                    <input 
                                        type="password" 
                                        id="novaSenha" 
                                        name="novaSenha" 
                                        value={userData.novaSenha} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                        placeholder="Mínimo 6 caracteres" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmarNovaSenha" className="block text-sm font-medium text-gray-300 mb-2">Confirmar Nova Senha</label>
                                    <input 
                                        type="password" 
                                        id="confirmarNovaSenha" 
                                        name="confirmarNovaSenha" 
                                        value={userData.confirmarNovaSenha} 
                                        onChange={handleChange} 
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400" 
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-end pt-6">
                            <button 
                                type="submit" 
                                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default MyAccountScreen;

