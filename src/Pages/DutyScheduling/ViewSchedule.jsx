import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'

const ViewSchedule = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="VIEW SCHEDULE" />
      </div>
    </Box>
  )
}

export default ViewSchedule
