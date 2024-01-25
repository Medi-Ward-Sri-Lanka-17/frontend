import React from 'react'
import Header from '../../Component/Header'
import SideBar from '../../Component/SideBar'
import { Box } from '@mui/material'

const CreateSchedul = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="CREATE SCHEDULE" />
      </div>
    </Box>
  )
}

export default CreateSchedul
