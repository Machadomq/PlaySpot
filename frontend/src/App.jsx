import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './assets/logo.png';
import usericon from './assets/usericon.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [mensagem, setMensagem] = useState("");
  const [courts, setCourts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar uma mensagem simples e as quadras reais da API
  useEffect(() => {
    setMensagem('Veja as quadras cadastradas e faça seu acesso ao sistema.');

    fetch('http://localhost:8080/api/quadras/public')
      .then(response => response.json())
      .then(data => setCourts(data))
      .catch(error => console.error('Erro ao buscar quadras:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourts = courts.filter(court =>
    (court.nomeQuadra || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserIconClick = () => {
    navigate('/login');
  };

  return (
    <>
      <header>
        <p className='titulo'>PlaySpot</p>
        <img className='usericon' src={usericon} alt='User Icon' onClick={handleUserIconClick} />
      </header>

      <div className='container'>
        <img src={logo} alt='Logo PlaySpot' className='logo' />
        <h2>Encontre sua próxima Quadra</h2>
        <p>{mensagem}</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className='courts-section'>
        <h3>Locais Próximos:</h3>
        <div className='courts-grid'>
          {filteredCourts.map(court => (
            <div key={court.idQuadra} className='court-card'>
              <img src={logo} alt={court.nomeQuadra} className='court-image' />
              <p className='court-price'>R$ {Number(court.valorHora || 0).toFixed(2)}</p>
              <p className='court-name'>{court.nomeQuadra}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
