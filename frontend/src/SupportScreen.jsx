import 'bootstrap/dist/css/bootstrap.min.css';
import './SupportScreen.css'; // Estilo específico para esta tela
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SupportScreen() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    // Informações de contato (podem vir de uma configuração ou API no futuro)
    const supportEmail = "suporte@playspot.com.br";
    const supportPhone = "(XX) YYYYY-ZZZZ";

    return (
        <div className="SupportScreenContainer">
            <header className="workbench-header">
                <p className="titulo" onClick={() => navigate('/')}>PlaySpot</p>
            </header>

            <div className="hotbar-container">
                <button className="hotbar-item" onClick={() => handleNavigation('/MyCourts')}>Minhas Quadras</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/Registration-courts')}>Cadastrar Quadra</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/BookingsScreen')}>Reservas</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/FinancialScreen')}>Financeiro</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/my-account')}>Minha conta</button>
                <button className="hotbar-item" onClick={() => handleNavigation('/SupportScreen')}>Suporte</button>
            </div>

            <div className="workbench-content">
                <h1 className="left-aligned">Suporte ao Cliente</h1>
                <p className="left-aligned">Precisa de ajuda? Entre em contato conosco!</p>
                <div className="linha-branca">­</div>

                <div className="support-info-container">
                    <div className="support-card">
                        <h2>Entre em Contato</h2>
                        <p>Se você tiver qualquer dúvida, problema ou sugestão, nossa equipe de suporte está pronta para ajudar.</p>
                        
                        <div className="contact-method">
                            <h3><i className="bi bi-envelope-fill"></i> E-mail:</h3>
                            <p>Para questões gerais, feedback ou suporte técnico, envie um e-mail para:</p>
                            <p><a href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
                            <p>Nosso objetivo é responder a todos os e-mails em até 24 horas úteis.</p>
                        </div>

                        <div className="contact-method">
                            <h3><i className="bi bi-telephone-fill"></i> Telefone:</h3>
                            <p>Para assistência imediata ou questões urgentes, você pode nos ligar no número:</p>
                            <p>{supportPhone}</p>
                            <p>Nosso atendimento telefônico está disponível de Segunda a Sexta, das 09:00 às 18:00.</p>
                        </div>

                        <p className="note">
                            Ao entrar em contato, por favor, forneça o máximo de detalhes possível sobre sua solicitação para que possamos ajudá-lo de forma eficiente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportScreen;

