import React, {useEffect, useState} from 'react';
import './Form.css';

function Form() {
  /**********
   * STATES *
   **********/
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agrees, setAgrees] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(null);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);


  /**********
   * EFECTS *
   **********/
  useEffect(() => {
    if (name.length === 0) {
      setNameIsValid(null);
      return;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑçÇ\s]+$/;
    if (regex.test(name)) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  }, [name]);

  useEffect(() => {
    if (email.length === 0) {
      setEmailIsValid(null);
      return;
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  /************
   * HANDLERS *
   ************/
  const sendData = () => {
    const endopoint = process.env.REACT_APP_BASE_DIR + 'server/suscribe';
    fetch(endopoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, agrees})
    })
    .then(response => response.json())
    .then(data => {
      setSending(false);
      setSent(data.success);
    })
    .catch(() => {
      setSending(false);
      setSent(false);
    });
  };

  /**********
   * RENDER *
   **********/
  return (
    <div className="Form d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="mb-4 fs-4">Enterate de las Novedades</h1>
        <div className="mb-3">
          <input 
            type="text" 
            className={'form-control rounded-0 border-0 border-bottom' + (nameIsValid === null ? '' : (nameIsValid? ' valid' : ' invalid'))} 
            placeholder="Nombre y Apellido" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={sending || sent}
          />
        </div>
        <div className="mb-3">
          <input 
            type="text" 
            className={'form-control rounded-0 border-0 border-bottom' + (emailIsValid === null ? '' : (emailIsValid? ' valid' : ' invalid'))}
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending || sent}
          />
        </div>
        <div className="form-check mb-3">
          <input 
            type="checkbox" 
            className="form-check-input rounded-0 bg-dark"
            id="agrees" 
            checked={agrees}
            onChange={(e) => setAgrees(e.target.checked)}
            disabled={sending || sent}
          />
          <label className="form-check-label" htmlFor="agrees">Acepto los términos y condiciones</label>
        </div>
        <div>
          <button 
            onClick={sendData}
            className="btn btn-dark rounded-0"
            disabled={!nameIsValid || !emailIsValid || !agrees || sending || sent}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
