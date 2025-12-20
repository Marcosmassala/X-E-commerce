import React from 'react'
import PerfilUsuario from './Meuperfil'
import SliderBar from './Sliderbar'
export default function page() {
  return (
    <div className='flex justify-around'>
      <SliderBar />
      <PerfilUsuario />

    </div>
  )
}
