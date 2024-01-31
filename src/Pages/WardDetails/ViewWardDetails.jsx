import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import Matron from '../../Component/wardDetails/Matron'

const ViewWardDetails = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="WARD DETAILS" />
        <Matron></Matron> 

      </div>
    </Box>
  )
}

export default ViewWardDetails
