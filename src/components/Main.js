import React, {useState, useEffect} from 'react';
import Form from './Form';
import flyer from '../images/franz.jpg';
import './Main.css';
// main.
function Main() {
  const [formOpen, setFormOpen] = useState(null);
  
  useEffect(() => {
    const endopoint = process.env.REACT_APP_BASE_DIR + 'server/isformopen';
    fetch(endopoint)
    .then(res => res.json())
    .then(data => {
      setFormOpen(data.data.form_open);
      if(!data.success) {
        alert(data.message);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  return (formOpen===null) ? <div>Loading...</div> : (
    <div className='container'>
      <nav className='navbar navbar-light bg-white my-3'>
        <div className='container'>
          <span className='navbar-brand mb-0 h1'></span>
          <span className='navbar-text'>
            { formOpen && <a className='navBarLink' href='#form'>Novedades y Pre-Venta</a> }
          </span>
        </div>
      </nav>
      <div className='row'>
        <div className='col'>
          <img src={flyer} className='w-100' />
        </div>
      </div>
      { formOpen &&
      <div className='row'>
        <div className='col'>
          <a name='form'></a>
          <Form />
        </div>
      </div>
      }
      <div className='row'>
        <div className='col'>
          <div className='text-center py-4 my-4'>
            <span style={{ fontSize:'0.7rem'}} className='text-secondary'> </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main