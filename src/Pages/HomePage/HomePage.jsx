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
  const authContext = useAuth()
  const nic = authContext.nic

  const [proImgUrl,setProImgUrl]=useState(null)

  useEffect(()=>{
    refreshPropilePicture(nic) 
 },[])

  useEffect(() => {
    refreshPropilePicture(nic)
  }, [])

  async function refreshPropilePicture(nic) {
    const response = await retrieveProfilePicture(nic)
    setProImgUrl(response)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />

      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="HOME" proImgUrl={proImgUrl} />
        <div className="main-container">
          <div>
            <h1 className='Latest-News'>Latest New</h1>
          </div>
          <div className="news-container">
            <Slider />
          </div>
          <div>
            <h1 className='Latest-News'>Upcomig Schedule</h1>
          </div>
          <div className="schedule-container">
            <div className="today">
              <div>
                 <h3>Today Schedule</h3>
              </div>
              <div className='t-content'>
                <div>
                  Morning-:
                </div>
                <div>
                  Evening-:
                </div>
                <div>
                  Night-:
                </div>
              </div>
            </div>
            <div className="tomorrow">
              <div>
                 <h3>Today Schedule</h3>
              </div>
              <div className='t-content'>
                <div>
                  Morning-:
                </div>
                <div>
                  Evening-:
                </div>
                <div>
                  Night-:
                </div>
              </div>
            </div>
            <div className="day-after-tomorrow">
               <div>
                 <h3>Today Schedule</h3>
              </div>
              <div className='t-content'>
                <div>
                  Morning-:
                </div>
                <div>
                  Evening-:
                </div>
                <div>
                  Night-:
                </div>
              </div>
            <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default HomePage
