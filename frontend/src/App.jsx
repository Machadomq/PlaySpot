import './App.css';
import logo from './assets/logo.png';
import usericon from './assets/usericon.png';
import { useState, useEffect } from 'react';

function App() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetch('') // alterar pro localhost certo
      .then(response => response.json())
      .then(data => setCourts(data))
      .catch(error => console.error('Erro ao buscar quadras:', error));
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header>
        <p className='titulo'>PlaySpot</p>
        <img className='usericon' src={usericon} alt='User Icon' />
      </header>

      <div className='container'>
        <img src={logo} alt='Logo PlaySpot' className='logo' />
        <h2>Encontre sua próxima Quadra</h2>
      </div>

      <div className='courts-section'>
        <h3>Locais Próximos:</h3>
        <div className='courts-grid'>
          {courts.map(court => (
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

