import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './Sli.css'
import LowerSlider from './LowerSlider';
import Post from './Post';

function Slider() {
    let data=[]

    Array.from({length:7}).forEach((_,i)=>{
        data.push(i)
    })
    console.log(data)

    const [activeSlide,setActiveSlide]=useState(0)

    const slideLeft=()=>{
        setActiveSlide((prev)=>prev > 0 ? prev-1: 0 )
    }

    const slideRight=()=>{
        setActiveSlide((prev)=>prev < data.length-1 ? prev + 1 : data.length-1)
    }

    const[isLow,setIsLow]=useState(false)

  return (
    <div className='slider-container'>
        <div className='inner-container'>
            <div className='slider'>
                <button onClick={slideLeft}>
                    <ArrowBackIosNewIcon/>
                </button>
                {data.map((item)=>(
                    <div className={`slide ${data[activeSlide]===item  ? "active":""}`}>
                        <Post item={item} isLow={isLow}/>
                    </div>
                ))}
                <button onClick={slideRight}>
                    <ArrowForwardIosIcon/>
                </button>
            </div>
            <div className='x'>
                <LowerSlider data={data} setActiveSlide={setActiveSlide}/>
            </div>
        </div>
    </div>
  )
}

export default Slider