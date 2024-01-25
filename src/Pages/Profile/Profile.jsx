import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'

const Profile = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="PROFILE" />
      </div>
    </Box>
  )
}

export default Profile
