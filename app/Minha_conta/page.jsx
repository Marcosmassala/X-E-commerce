import React from 'react'
import Minha_conta from './Minha_conta'
import SliderBar from '../meuperfil/Sliderbar'
export default function page() {
  return (
    <div className='flex justify-around '>
      <SliderBar />  
      <Minha_conta />
    </div>
  )
}
