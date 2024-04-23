import React from 'react'
import './LowerSli.css'
import MinPost from './MinPost'
import { useState } from 'react'

function LowerSlider({news,setActiveSlide}) {

    const slideSelect=(i)=>{
        setActiveSlide(i)
    }

    const[isLow,setIsLow]=useState(true)

  return (
    <div className='lower-slider' >
        {news.map((item)=>(
            <div key={item} className='lower-slide' onClick={()=>setActiveSlide(item.key)}>
            </div>
        ))}
    </div>
  )
}

export default LowerSlider