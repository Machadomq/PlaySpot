import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';
import RegisterPage from './RegisterPage.jsx';
import ForgotPass from './ForgotPass.jsx';
import FPConfirmation from './FPConfirmation.jsx';
import RegisterConfirmation from './RegisterConfirmation.jsx';
import Workbench from "./Workbench.jsx";
import RegistrationCourts from "./RegistrationCourts.jsx";
import MyCourts from "./MyCourts.jsx";
import BookingsScreen from "./BookingsScreen.jsx";
import FinancialScreen from "./FinancialScreen.jsx";
import MyAccountScreen from "./MyAccountScreen.jsx";
import SupportScreen from "./SupportScreen.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/fp-confirmation" element={<FPConfirmation />} />
        <Route path="/register-confirmation" element={<RegisterConfirmation />} />
        <Route path="/Workbench" element={<Workbench />} />
        <Route path="/registration-courts" element={<RegistrationCourts />} />
        <Route path="/MyCourts" element={<MyCourts/>} />
        <Route path="/BookingsScreen" element={<BookingsScreen/>} />
        <Route path="/FinancialScreen" element={<FinancialScreen />} />
        <Route path="/my-account" element={<MyAccountScreen />} />
        <Route path="/SupportScreen" element={<SupportScreen />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  </StrictMode>,
);