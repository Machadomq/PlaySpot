import logo from './assets/logo.png';
import usericon from './assets/usericon.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [mensagem, setMensagem] = useState("");
  const [courts, setCourts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar a mensagem da API
  useEffect(() => {
    fetch("http://localhost:8083/api/exemplo")
      .then(response => response.json())
      .then(data => setMensagem(data.mensagem))
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  // Carregar as quadras da API
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
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
              PlaySpot
            </h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleUserIconClick}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <img className="w-8 h-8" src={usericon} alt='User Icon' />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <img src={logo} alt='Logo PlaySpot' className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Encontre sua próxima Quadra</h2>
          <p className="text-lg text-gray-300 mb-8">{mensagem}</p>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Pesquisar quadras..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-semibold text-white mb-6">Locais Próximos</h3>
          {filteredCourts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourts.map(court => (
                <div key={court.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:bg-gray-750 transition-colors">
                  <img 
                    src={court.imageUrl} 
                    alt={court.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">{court.name}</h4>
                      <span className="text-lg font-bold text-green-400">{court.price}</span>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Nenhuma quadra encontrada</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
