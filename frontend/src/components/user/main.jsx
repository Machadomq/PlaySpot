import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from '../../App.jsx';
import Login from '../both/Login.jsx';
import RegisterPage from '../both/RegisterPage.jsx';
import ForgotPass from '../both/ForgotPass.jsx';
import FPConfirmation from '../both/FPConfirmation.jsx';
import RegisterConfirmation from '../both/RegisterConfirmation.jsx';
import Workbench from "../admin/Workbench.jsx";
import RegistrationCourts from "../admin/RegistrationCourts.jsx";
import MyCourts from "../admin/MyCourts.jsx";
import BookingsScreen from "../admin/BookingsScreen.jsx";
import FinancialScreen from "../admin/FinancialScreen.jsx";
import MyAccountScreen from "../both/MyAccountScreen.jsx";
import SupportScreen from "../both/SupportScreen.jsx";
import AdminPanel from "../admin/AdminPanel.jsx";
import { ProtectedRoute, ProtectedWorkbenchRoute, ProtectedAdminRoute } from '../both/AuthComponents.jsx';

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
        
        {/* Rotas protegidas para workbench (proprietários e admins) */}
        <Route path="/Workbench" element={
          <ProtectedWorkbenchRoute>
            <Workbench />
          </ProtectedWorkbenchRoute>
        } />
        <Route path="/workbench" element={
          <ProtectedWorkbenchRoute>
            <Workbench />
          </ProtectedWorkbenchRoute>
        } />
        <Route path="/registration-courts" element={
          <ProtectedWorkbenchRoute>
            <RegistrationCourts />
          </ProtectedWorkbenchRoute>
        } />
        <Route path="/Registration-courts" element={
          <ProtectedWorkbenchRoute>
            <RegistrationCourts />
          </ProtectedWorkbenchRoute>
        } />
        <Route path="/MyCourts" element={
          <ProtectedWorkbenchRoute>
            <MyCourts/>
          </ProtectedWorkbenchRoute>
        } />
        <Route path="/BookingsScreen" element={
          <ProtectedWorkbenchRoute>
            <BookingsScreen/>
          </ProtectedWorkbenchRoute>
        } />
        <Route path="/FinancialScreen" element={
          <ProtectedWorkbenchRoute>
            <FinancialScreen />
          </ProtectedWorkbenchRoute>
        } />
        
        {/* Rotas protegidas para usuários logados */}
        <Route path="/my-account" element={
          <ProtectedRoute>
            <MyAccountScreen />
          </ProtectedRoute>
        } />
        <Route path="/SupportScreen" element={
          <ProtectedRoute>
            <SupportScreen />
          </ProtectedRoute>
        } />
        
        {/* Rota protegida apenas para admins */}
        <Route path="/AdminPanel" element={
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        } />
      </Routes>
    </Router>
  </StrictMode>,
);