import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import Matron from '../../Component/wardDetails/WardManagement'
import WardManagement from '../../Component/wardDetails/WardManagement'
import { useAuth } from '../../Security/AuthContext'
import { retrieveProfilePicture } from '../../Services/Home/retrieveProfilePicture'

const ViewWardDetails = () => {


  //.............................................Load Profile Picture........................................................

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

//............................................................................................................................


  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="WARD DETAILS" proImgUrl={proImgUrl} />
        <WardManagement />
      </div>
    </Box>
  )
}

export default ViewWardDetails
