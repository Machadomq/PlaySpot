import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import UserProfile from './UserProfile.jsx'; // exemplo de outro componente

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  </StrictMode>,
);
