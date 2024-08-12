import React from 'react'
import flyer from '../images/crumb.jpg';

export default function Flyer() {
  return (
    <div className='Flyer d-flex justify-content-center align-items-center'>
      <img 
        src={flyer} 
        style={{
          width: '100%',
          maxWidth: '780px'
        }}
      />
    </div>
  )
}
