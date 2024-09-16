import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlanesCoberturas.css';
import iconMe from '../assets/icon-me.svg';
import iconOther from '../assets/icon-other.svg';
import iconPlan0 from '../assets/plan-0.svg';
import iconPlan1 from '../assets/plan-1.svg';
import iconPlan2 from '../assets/plan-2.svg';

const PlanesCoberturas = ({ setSelectedPlan, setSelectedTab, setSelectedUser }) => {
  const formData = JSON.parse(localStorage.getItem('formData'));
  const apiData = JSON.parse(localStorage.getItem('apiData'));

  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [age, setAge] = useState(0);
  const planIcons = [iconPlan0, iconPlan1, iconPlan2];

  // Calcular la edad del usuario
  useEffect(() => {
    if (apiData && apiData.birthDay) {
      const birthDate = new Date(apiData.birthDay.split('-').reverse().join('-'));
      const ageDiffMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiffMs);
      setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
    }
  }, [apiData]);

  // Llamada a la API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('https://rimac-front-end-challenge.netlify.app/api/plans.json');
        setPlans(response.data.list);
        localStorage.setItem('plansData', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error al consultar la API de planes', error);
      }
    };

    fetchPlans();
  }, []);

  // Filtrar planes según la edad
  const filterPlansByAge = () => {
    const filtered = plans.filter(plan => plan.age >= age);
    setFilteredPlans(filtered);
  };

  // Selección de la opción (Para mí / Para alguien más)
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    filterPlansByAge();
  
    localStorage.setItem('selectedOption', option); // Almacenar opción seleccionada en localStorage
  
    if (option === 'someoneElse') {
      const discountedPlans = filteredPlans.map(plan => ({
        ...plan,
        price_old: plan.price,
        price: (plan.price * 0.95).toFixed(2), // Aplicar descuento del 5%
      }));
      setFilteredPlans(discountedPlans);
      localStorage.setItem('filteredPlans', JSON.stringify(discountedPlans)); // Almacenar planes filtrados con descuento
    } else {
      localStorage.setItem('filteredPlans', JSON.stringify(filteredPlans)); // Almacenar planes filtrados sin descuento
    }
  };

  useEffect(() => {
    const savedOption = localStorage.getItem('selectedOption');
    const savedPlans = localStorage.getItem('filteredPlans');
    
    if (savedOption) {
      setSelectedOption(savedOption);
    }
    
    if (savedPlans) {
      setFilteredPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Manejar la selección de un plan y cambiar a la vista de resumen
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('selectedPlan', JSON.stringify(plan)); // Almacenar el plan seleccionado en localStorage
    setSelectedTab(1); // Cambia a la pestaña de resumen
  };

  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    
    if (savedPlan) {
      setSelectedPlan(JSON.parse(savedPlan));
    }
  }, []);

  if (!formData || !apiData) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div>
      <h2 className='planes-header'>{apiData.name} ¿Para quién deseas cotizar?</h2>
      <p className='planes-subtitle'>Selecciona la opción que se ajuste más a tus necesidades.</p>
      {/* Selección de opciones */}
      <div className="option-selector">
        <div
          className={`option-card ${selectedOption === 'me' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('me')}
        >
          <div className="icon-container">
            <div className="icon-circle me">
            <div className="checkmark">&#10003;</div>
            </div>
          </div>
          <img src={iconMe} alt="Family" className="family-image" />
          <h3>Para mí</h3>
          <p>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
        </div>
        <div
          className={`option-card ${selectedOption === 'someoneElse' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('someoneElse')}
        >
          <div className="icon-container">
            <div className="icon-circle someoneElse">
              <div className="checkmark">&#10003;</div>
            </div>
          </div>
          <img src={iconOther} alt="Family" className="family-image" />
          <h3>Para alguien más</h3>
          <p>Realiza una cotización para alguien diferente a ti.</p>
        </div>
      </div>

      {/* Mostrar planes */}
      {selectedOption && (
        <div>
          <div className="plans-list">
            {filteredPlans.map((plan, index) => (
              <div key={index} className={`plan-card`}>
                {index == 1 && <div className="recommended-badge">Plan recomendado</div>}
                <div className="plan-header">
                  <h3>{plan.name} {index}</h3>
                  <img src={planIcons[index]} alt={`Icono del plan ${plan.name}`} />
                </div>
                <div className='price-container'>
                  <div className='label-cost'>Costo del plan:</div>
                  {selectedOption == 'someoneElse' &&<span className="plan-original-price">${plan.price_old} antes</span>}
                  <div className="plan-price">${plan.price} al mes</div>
                </div>
                <ul className="plan-details">
                  {plan.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <button className="select-plan-button" onClick={() => handlePlanSelect(plan)}>
                  <span className='select-plan-text'>Seleccionar Plan</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanesCoberturas;
