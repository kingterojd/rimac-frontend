import React from 'react';
import Form from '../components/Form';
import { FaPhoneAlt } from 'react-icons/fa';
import rimacLogo from '../assets/rimac-logo-red.svg';
import familyImage from '../assets/family-image.svg';
import './Home.css'; // Importamos el CSS para estilos

const Home = () => {
  return (
    <>
      {/* Header */}
      <header className="header">
        <img src={rimacLogo} alt="Rimac Logo" className="rimac-logo" />
        <div className="contact-info">
          <FaPhoneAlt className="phone-icon" />
          <span className="phone-number">(01) 411 6001</span>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <div className="image-container">
          <img src={familyImage} alt="Family" className="family-image" />
        </div>
        <div className="form-section">
            <Form />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <img src={rimacLogo} alt="Rimac Logo Footer" className="rimac-logo-footer" />
        <p>&copy; 2023 RIMAC Seguros y Reaseguros.</p>
      </footer>
    </>
  );
};

export default Home;
