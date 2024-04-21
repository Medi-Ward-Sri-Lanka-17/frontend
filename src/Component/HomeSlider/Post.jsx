import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './Pos.css'

function Post({item,isLow}) {


  return (
    <div className={isLow ? 'lower-container':'container'}>
        <div className={isLow ?'lower-devider':'devider'}>
            <div className={isLow?'lower-left':'left'}>
                <div className={isLow?'lower-profile':'profile'}>
                <Avatar className={isLow?'lower-avatar':'avatar'}/>
                <span>Name</span>
                </div>
                <div>
                    <span>position</span>
                </div>
                <div className={isLow?'lower-image-div':'image-div'}>
                    {item}
                </div>
            </div>
            <div className={isLow?'lower-right':'right'}>
                <p className={isLow ?'lower-description-div':'description-div'}>
                     {item}
                </p>
                 
            </div>
        </div>
    </div>
  )
}

export default Post