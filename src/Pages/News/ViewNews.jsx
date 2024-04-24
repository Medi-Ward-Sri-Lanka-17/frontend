import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import SideBar from '../../Component/SideBar'
import { Box } from '@mui/material'
import NewList from '../../Component/NewsPost/NewList'
import { useAuth } from '../../Security/AuthContext'
import { retrieveProfilePicture } from '../../Services/Home/retrieveProfilePicture'

const ViewNews = () => {

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
        <Header title="NEWS" proImgUrl={proImgUrl}/>
        <div>
          <NewList/>
        </div>
      </div>
    </Box>
  )
}

export default ViewNews
