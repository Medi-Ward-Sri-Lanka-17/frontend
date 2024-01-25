import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="header" style={{ width: '100%' }}>
        <Header title="LEAVE APPROVE" />
      </div>
    </Box>
  )
}

export default HomePage
