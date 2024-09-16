import React, { useState } from 'react';
import PlanesCoberturas from './PlanesCoberturas';
import Resumen from './Resumen';
import './PlanSlider.css'; // Archivo CSS adicional para los estilos
import rimacLogo from '../assets/rimac-logo-red.svg';
import { FaPhoneAlt } from 'react-icons/fa';
import { BiChevronLeftCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const PlanSlider = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 para PlanesCoberturas, 1 para Resumen
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();
  return (
    <div className="slider-container">
      {/* Header con logo y botones */}
      <header className="header">
        <div className="logo">
          <img src={rimacLogo} alt="Rimac Logo" />
        </div>
        <div className="contact-info">
          <span>¡Compra por este medio!</span>
          <FaPhoneAlt style={{marginRight: '8px',}}/>
          <a href="tel:(01)4116001" className="phone-number">(01) 411 6001</a>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-content">
        <div className="tabs">
          <button
            className={`tab-button ${selectedTab === 0 ? 'active' : ''}`}
            onClick={() => setSelectedTab(0)}
          >
            <span className="tab-index">1</span> Planes y Coberturas
          </button>
          <div className="tab-separator">
            <span className="dotted-line"></span>
          </div>
          <button
            className={`tab-button ${selectedTab === 1 ? 'active' : ''}`}
            onClick={() => setSelectedTab(1)}
            disabled={selectedTab === 0}
          >
            <span className="tab-index">2</span> Resumen
          </button>
        </div>
      </div>

      {/* Mostrar componente basado en la pestaña seleccionada */}

      <div className='back-container'>
        <button className={`tab-button`} onClick={() => navigate('/')}>
        <BiChevronLeftCircle style={{marginRight: '5px', fontSize: '22px', color: '#4F4FFF'}}/> 
        <span style={{fontSize: '18px', color: '#4F4FFF'}}>Volver</span>
        </button>
      </div>

      <div className="slider-content">
        {selectedTab === 0 && (
          <PlanesCoberturas 
            setSelectedPlan={setSelectedPlan} 
            setSelectedTab={setSelectedTab} 
            setSelectedUser={setSelectedUser}
          />
        )}
        {selectedTab === 1 && selectedPlan && <Resumen plan={selectedPlan} user={selectedUser}/>}
      </div>
    </div>
  );
};

export default PlanSlider;
