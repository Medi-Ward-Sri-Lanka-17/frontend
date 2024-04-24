import React, { useEffect, useState } from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import AddNewsForm from '../../Component/NewsPost/AddNewsForm'
import './AddNew.css'
import { useAuth } from '../../Security/AuthContext'
import { retrieveProfilePicture } from '../../Services/Home/retrieveProfilePicture'

const AddNews = () => {

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
        <Header title="ADD NEWS" proImgUrl={proImgUrl}/>
        <div className='form-container'>
          <div>
            <h1 className='title'>Publish Your News Here</h1>
          </div>
          <AddNewsForm/>
        </div>
      </div>
    </Box>
  )
}

export default AddNews
