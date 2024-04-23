import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './Pos.css'

function Post({item,isLow}) {


  return (
    <div className={isLow ? 'lower-container':'container'}>
        <div className={isLow ?'lower-devider':'devider'}>
            <div className={isLow?'lower-left':'left'}>
                <div className='top-devider'>
                    <div className={isLow?'lower-profile':'profile'}>
                        <Avatar 
                        className={isLow?'lower-avatar':'avatar'}
                        alt={"news-dp-load -error"}
                        src={item.proImgUrl}
                        sx={{ width: 50, height: 50 }}
                        />
                    
                    </div>
                    <div className='details'>
                        <span>{item.fullName  }</span>
                        <span className='position'>{item.position}</span>
                        <span className='time'>{item.pushedDate}</span>
                    </div>
                </div>

                <div className={isLow?'lower-image-div':'image-div'}>
                    <img src={item.imgUrl} alt="Description of the image" className='img'/>
                </div>
            </div>
            <div className={isLow?'lower-right':'right'}>
                <div className='date'>
                    
                </div>
                <div className={isLow ?'lower-description-div':'description-div'}>
                    <h1 className='header'>{item.newsHeader}</h1>
                    <p className='news'>
                        {item.newsDescription}
                    </p>
                </div>

                 
            </div>
        </div>
    </div>
  )
}

export default Post