import React from 'react'
import './LowerSli.css'
import Post from './Post'
import { useState } from 'react'

function LowerSlider({data,setActiveSlide}) {

    const slideSelect=(i)=>{
        setActiveSlide(i)
    }

    const[isLow,setIsLow]=useState(true)

  return (
    <div className='lower-slider' >
        {data.map((item)=>(
            <div key={item} className='lower-slide' onClick={()=>setActiveSlide(item)}>
                 <Post item={item} isLow={isLow} className='post'/>
            </div>
        ))}
    </div>
  )
}

export default LowerSlider