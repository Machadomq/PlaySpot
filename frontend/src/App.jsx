import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './assets/logo.png';
import usericon from './assets/usericon.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const [courts, setCourts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/courts') // alterar pro localhost certo
      .then(response => response.json())
      .then(data => setCourts(data))
      .catch(error => console.error('Erro ao buscar quadras:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserIconClick = () => {
    navigate('/user-profile');
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
            <div key={court.id} className='court-card'>
              <img src={court.imageUrl} alt={court.name} className='court-image' />
              <p className='court-price'>{court.price}</p>
              <p className='court-name'>{court.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;