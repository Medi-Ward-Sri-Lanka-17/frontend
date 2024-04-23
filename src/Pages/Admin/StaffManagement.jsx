import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import Matron from '../../Component/wardDetails/WardManagement'
import WardManagement from '../../Component/wardDetails/WardManagement'

const StaffManagement = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="WARD DETAILS" />
        <WardManagement />
      </div>
    </Box>
  )
}

export default StaffManagement
