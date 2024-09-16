import React from 'react';
import './Resumen.css';

const ResumeItem = ({title, item1, item2}) => {
  return (
    <div style={{ margin: '20px 0px' }}>
      <p className='titleItem'>{title}</p>
      <p className='textItem'>{item1}</p>
      <p className='textItem'>{item2}</p>
    </div>
  );
};

export default ResumeItem;