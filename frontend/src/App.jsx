import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import usericon from './assets/usericon.png'
import searchicon from './assets/searchicon.png'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header>
        <p className='titulo'>PlaySpot</p>
        <img className='usericon' src={usericon} alt="" />
      </header>

      <div className="container">
        <img className="logoPlaySpot" src={logo} alt="" />
        <h2>Encontre sua proxima quadra:</h2>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </>
  )
}

export default App