import React from 'react';
import './Form.css';

function Form() {
  return (
    <div className="Form d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="mb-4 ms-3">Tus datos</h1>
        <div className="mb-33">
          <input 
            type="text" 
            className="form-control border-0 border-bottom" 
            placeholder="Nombre y Apellido" 
          />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control border-0 border-bottom" 
            placeholder="Email" 
          />
        </div>
        <div>
          <button className="btn btn-dark rounded-0">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
