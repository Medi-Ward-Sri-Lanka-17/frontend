import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './MinPo.css'

function MinPost({item}) {


  return (
    <div className='lower-container'>
        <div className='lower-devider'>
            <div className='lower-left'>
                <div className='lower-profile'>
                <Avatar className='lower-avatar'/>
                <span>Name</span>
                </div>
                <div>
                    <span>position</span>
                </div>
                <div className='lower-image-div'>
                    {item.newsHeader}
                </div>
            </div>
            <div className='lower-right'>
                <p className='lower-description-div'>
                     {item.newsHeader}
                </p>
                 
            </div>
        </div>
    </div>
  )
}

export default MinPost