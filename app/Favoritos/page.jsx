import React from 'react'
import SliderBar from '../meuperfil/Sliderbar'
import FavoritosContent from './Favoritos'
export default function page() {
  return (
    <div className='flex justify-around'>
        <SliderBar />
      <FavoritosContent />
    </div>
  )
}
