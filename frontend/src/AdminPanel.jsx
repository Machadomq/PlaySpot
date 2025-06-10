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
    return <div className="container mt-4">Carregando...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Painel de Administração</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/workbench')}>
          Voltar ao Workbench
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h4>Gerenciar Usuários</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.idUser}>
                    <td>{user.idUser}</td>
                    <td>{user.nameUser}</td>
                    <td>{user.emailUser}</td>
                    <td>
                      <span className={`badge ${
                        user.tipoCliente === 'ADMIN' ? 'bg-danger' :
                        user.tipoCliente === 'COMERCIO' ? 'bg-warning' : 'bg-info'
                      }`}>
                        {getUserTypeLabel(user.tipoCliente)}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedUser(user)}
                        disabled={user.idUser === parseInt(userId)} // Não pode alterar próprio tipo
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
        <div className="modal show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alterar Tipo de Usuário</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => {setSelectedUser(null); setNewUserType('');}}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Usuário:</strong> {selectedUser.nameUser}</p>
                <p><strong>Tipo atual:</strong> {getUserTypeLabel(selectedUser.tipoCliente)}</p>
                
                <div className="mb-3">
                  <label className="form-label">Novo tipo:</label>
                  <select 
                    className="form-select"
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
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {setSelectedUser(null); setNewUserType('');}}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => handleUpdateUserType(selectedUser)}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
