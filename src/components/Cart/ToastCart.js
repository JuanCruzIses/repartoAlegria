import React from 'react';

const CustomToast = ({ image, message }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={image} alt="Custom Toast" style={{ width: '65px', height:'auto', marginRight: '10px' }} />
    <div>
      <p>{message}</p>
    </div>
  </div>
);

export default CustomToast;