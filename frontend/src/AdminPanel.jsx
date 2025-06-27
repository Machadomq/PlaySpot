import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserType } from './AuthComponents';

function AdminPanel() {
  const navigate = useNavigate();
  const { isAdmin, userId } = useUserType();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserType, setNewUserType] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/usuarios', {
        headers: {
          'userId': userId
        }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao carregar usuários');
      setLoading(false);
    }
  };

  const handleUpdateUserType = async (user) => {
    if (!newUserType) {
      alert('Selecione um tipo de usuário');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/admin/usuarios/${user.idUser}/tipo`, newUserType, {
        headers: {
          'userId': userId,
          'Content-Type': 'application/json'
        }
      });
      alert('Tipo de usuário atualizado com sucesso!');
      fetchUsers();
      setSelectedUser(null);
      setNewUserType('');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar tipo de usuário');
    }
  };

  const getUserTypeLabel = (type) => {
    switch (type) {
      case 'CLIENTE': return 'Cliente';
      case 'COMERCIO': return 'Proprietário';
      case 'ADMIN': return 'Administrador';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-400">Painel de Administração</h1>
            <button 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              onClick={() => navigate('/workbench')}
            >
              Voltar ao Workbench
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h4 className="text-lg font-semibold text-white">Gerenciar Usuários</h4>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map(user => (
                    <tr key={user.idUser} className="hover:bg-gray-750">
                      <td className="px-4 py-3 text-sm text-white">{user.idUser}</td>
                      <td className="px-4 py-3 text-sm text-white">{user.nameUser}</td>
                      <td className="px-4 py-3 text-sm text-white">{user.emailUser}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.tipoCliente === 'ADMIN' ? 'bg-red-900 text-red-200' :
                          user.tipoCliente === 'COMERCIO' ? 'bg-yellow-900 text-yellow-200' : 'bg-blue-900 text-blue-200'
                        }`}>
                          {getUserTypeLabel(user.tipoCliente)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button 
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
                          onClick={() => setSelectedUser(user)}
                          disabled={user.idUser === parseInt(userId)}
                        >
                          Alterar Tipo
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal para alterar tipo de usuário */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h5 className="text-lg font-semibold text-white">Alterar Tipo de Usuário</h5>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => {setSelectedUser(null); setNewUserType('');}}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-2"><span className="font-medium text-white">Usuário:</span> {selectedUser.nameUser}</p>
                <p className="text-gray-300 mb-4"><span className="font-medium text-white">Tipo atual:</span> {getUserTypeLabel(selectedUser.tipoCliente)}</p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Novo tipo:</label>
                  <select 
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    value={newUserType}
                    onChange={(e) => setNewUserType(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    <option value="CLIENTE">Cliente</option>
                    <option value="COMERCIO">Proprietário</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-700 flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => {setSelectedUser(null); setNewUserType('');}}
                >
                  Cancelar
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => handleUpdateUserType(selectedUser)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
