import React from 'react'
import AjudaContent from './Ajuda'
import SliderBar from '../meuperfil/Sliderbar'
export default function page() {
  return (
    <div className='flex justify-around'>
        <SliderBar />
      <AjudaContent />
    </div>
  )
}
