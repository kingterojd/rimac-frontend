import React from 'react';
import './Resumen.css';
import iconPeople from '../assets/icon-people.svg';
import ResumeItem from './ResumeItem';

const Resumen = ({ plan }) => {
  if (!plan) return <div className="no-plan">No hay plan seleccionado</div>;
  const formData = JSON.parse(localStorage.getItem('formData'));
  const apiData = JSON.parse(localStorage.getItem('apiData'));

  return (
    <div className="resumen-container">
      <div className='title-container'>
        <h2 className="resumen-title">Resumen del seguro</h2>
      </div>
      <div className="resumen-card">
        <div className="resumen-person">
          <div className='resumen-label'>Precios calculados para:</div>
          <div style={{padding: '10px 0px'}}>
            <img src={iconPeople} alt="People" /> 
            <span className='user-label'>
              { `${apiData.name} ${apiData.lastName}` }
            </span>
          </div>
        </div>
        <div className="resumen-details">
          <ResumeItem 
            title="Responsable de pago"
            item1={`${formData.documentType}: ${formData.dni}`}
            item2={`Celular: ${formData.phone}`}
          />
          <ResumeItem 
            title="Plan elegido"
            item1={plan.name}
            item2={`Costo del plan: ${plan.price} al mes`}
          />
        </div>
      </div>
    </div>
  );
};

export default Resumen;
