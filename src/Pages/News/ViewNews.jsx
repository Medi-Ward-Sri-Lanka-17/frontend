import React from 'react'
import Header from '../../Component/Header'
import SideBar from '../../Component/SideBar'
import { Box } from '@mui/material'

const ViewNews = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="NEWS" />
      </div>
    </Box>
  )
}

export default ViewNews
