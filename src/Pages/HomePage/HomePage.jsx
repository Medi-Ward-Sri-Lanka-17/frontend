import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import './Home.css'
import Slider from '../../Component/HomeSlider/Slider'
import { retrieveProfilePicture } from '../../Services/Home/retrieveProfilePicture'
import { useAuth } from '../../Security/AuthContext'



const img1 = require('../../Assest/mainlogo.png')


const HomePage = () => {

  const authContext = useAuth();
  const nic = authContext.nic;

  const [proImgUrl,setProImgUrl]=useState(null)

  useEffect(()=>{
    refreshPropilePicture(nic) 
 },[])

 async function refreshPropilePicture(nic){
      const response= await retrieveProfilePicture(nic)
      setProImgUrl(response)

      
 }


  return (
    <Box  sx={{ display: 'flex'}}>
        <SideBar />
      
      <div className="PageContent" style={{ width: '100%'}}>
        <Header title="HOME" proImgUrl={proImgUrl} />
        <div className='main-container'>
          <div>
            <h1>Latest New</h1>
          </div>
          <div className='news-container'>
              <Slider/>
          </div>
          <div>
            <h1>Upcomig Schedule</h1>
          </div>
          <div className='schedule-container'>
              <div className='today'>

              </div>
              <div className='tomorrow'>

              </div>
              <div className='day-after-tomorrow'>

              </div>
          </div>
          
              

             

          
        
        </div>
      </div>
    </Box>
  )
}

export default HomePage
