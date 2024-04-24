import React from 'react'
import Header from '../../Component/Header'
import SideBar from '../../Component/SideBar'
import { Box } from '@mui/material'
import NewList from '../../Component/NewsPost/NewList'

const ViewNews = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="NEWS" />
        <div>
          <NewList/>
        </div>
      </div>
    </Box>
  )
}

export default ViewNews
