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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);


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

  useEffect(() => {
    setSent(null);
    setError(null);
    setMessage(null);
  }, [agrees, email, name]);

  /************
   * HANDLERS *
   ************/
  const sendData = () => {
    setSending(true);
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
      setError(data.error);
      setMessage(data.message);
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
    <div className='Form'>
      <div className="py-4">
        <div className='text-center'>
          <h1 className="mb-4">Enterate de las Novedades y Accedé a la Pre-Venta</h1>
        </div>
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
        { !agrees && 
          <div className='mb-3'>
            <p>
            Franz Ferdinand, Indie Folks y Spa utilizarán la información que proporciones en este formulario para estar en contacto contigo y para enviarte actualizaciones y marketing.
            </p>
            <p>
            Podés cambiar de opinión en cualquier momento haciendo clic en el enlace de desuscripción en el pie de cualquier correo electrónico que recibas de nosotros. Trataremos tu información con respeto. Al hacer clic a continuación, aceptás que podamos procesar tu información de acuerdo con estos términos.
            </p>
            <p>
              Usamos Mailchimp como nuestra plataforma de marketing. Al hacer clic a continuación para suscribirte, reconocés que tu información será transferida a Mailchimp para su procesamiento. Consulta más información sobre las prácticas de privacidad en Mailchimp.
            </p>
          </div>
        }
        <div className='mb-3'>
          <button 
            onClick={sendData}
            className="btn btn-dark rounded-0"
            disabled={!nameIsValid || !emailIsValid || !agrees || sending || sent}
          >
            Enviar
          </button>
        </div>
        { sending &&
        <div className='mb-3'>
          Enviando...
        </div>
        }
        { (!sending && message) &&
        <div className='mb-3'>
          {message}
        </div>
        }
        { (!sending && error) &&  
        <div className='mb-3'>
          {error}
        </div>
        }
      </div>
    </div>
  );
}

export default Form;
