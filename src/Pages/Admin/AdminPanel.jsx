import React from 'react'
import Header from '../../Component/Header'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SideBar from '../../Component/SideBar'
import { useAuth } from '../../Security/AuthContext'

const AdminPanel = () => {


//..................................Profile Picture...........................................................

const authContext=useAuth();
const proImgUrl=authContext.proPicUrl;

//............................................................................................................


  // Set use Navigate
  const navigate = useNavigate()

  //Handle summit add staff button
  function handleSubmit() {
    navigate('/admin/staff/add')
  }

  return (
    <Box>
      <Header title="Admin Panel" proImgUrl={proImgUrl} />
      <SideBar />
      <Button onClick={() => handleSubmit()}>Add Staff</Button>
    </Box>
  )
}

export default AdminPanel
