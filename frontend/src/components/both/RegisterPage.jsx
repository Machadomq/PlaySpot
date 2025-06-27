import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userIcon from './assets/userIcon2.png';

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nameUser: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: '',
        emailUser: '',
        passwordUser: '',
        confirmarSenha: '',
        tipoCliente: 'CLIENTE' // Valor padrão
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.passwordUser !== formData.confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/cadastrar', formData);
            console.log('Usuário cadastrado:', response.data);
            navigate('/register-confirmation');
        } catch (error) {
            console.error('Erro no cadastro:', error.response?.data || error.message);
            alert('Erro ao cadastrar usuário');
        }
    };

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 
                        className="text-3xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors mb-6"
                        onClick={handleTitleClick}
                    >
                        PlaySpot
                    </h1>
                    <img src={userIcon} alt="User Icon" className="w-20 h-20 rounded-full shadow-lg mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-2">Criar Conta</h2>
                    <p className="text-gray-300">Preencha os dados abaixo para se cadastrar</p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
                                    <input
                                        type="text"
                                        name="nameUser"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Digite seu nome"
                                        value={formData.nameUser}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        name="dataNascimento"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                        value={formData.dataNascimento}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">CPF</label>
                                    <input
                                        type="text"
                                        name="cpf"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="000.000.000-00"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                                    <input
                                        type="text"
                                        name="telefone"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="(11) 99999-9999"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Conta</label>
                                    <select
                                        name="tipoCliente"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                                        value={formData.tipoCliente}
                                        onChange={handleChange}
                                    >
                                        <option value="CLIENTE">Cliente</option>
                                        <option value="COMERCIO">Proprietário de Quadra</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                                    <input
                                        type="text"
                                        name="estado"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: São Paulo"
                                        value={formData.estado}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Santos"
                                        value={formData.cidade}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Centro"
                                        value={formData.bairro}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Rua</label>
                                    <input
                                        type="text"
                                        name="rua"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Ex: Rua das Flores"
                                        value={formData.rua}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Número</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="123"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">CEP</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="00000-000"
                                        value={formData.cep}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="emailUser"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="seu@email.com"
                                        value={formData.emailUser}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                                    <input
                                        type="password"
                                        name="passwordUser"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Mínimo 6 caracteres"
                                        value={formData.passwordUser}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Senha</label>
                                    <input
                                        type="password"
                                        name="confirmarSenha"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                                        placeholder="Digite a senha novamente"
                                        value={formData.confirmarSenha}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button 
                                type="button"
                                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                onClick={() => navigate('/login')}
                            >
                                Já tenho conta
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Criar Conta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;