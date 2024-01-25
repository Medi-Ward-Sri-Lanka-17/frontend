import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'

const RequestLeave = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div>
        <Header title="LEAVE REQUEST" />
      </div>
    </Box>
  )
}

export default RequestLeave
