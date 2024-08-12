import React from 'react';
import Form from './Form';
import flyer from '../images/crumb.jpg';
import './Main.css';
// main.
function Main() {
  return (
    <div className='container'>
      <nav className='navbar navbar-light bg-white my-3'>
        <div className='container'>
          <span className='navbar-brand mb-0 h1'></span>
          <span className='navbar-text'>
            <a className='navBarLink' href='#form'>Novedades y Pre-Venta</a>
          </span>
        </div>

      </nav>
      <div className='row'>
        <div className='col'>
          <img src={flyer} className='w-100' />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <a name='form'></a>
          <Form />
        </div>
      </div>
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