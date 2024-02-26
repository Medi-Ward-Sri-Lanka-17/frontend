import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import SideBar from '../../Component/SideBar'
import AddMatron from '../../Component/Forms/AddMatron'
import Header from '../../Component/Header'
import DefaultButton from '../../Component/Button/DefaultButton'

const MatronManagement = () => {
  const [isAddMatronOpen, setIsAddMatronOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      {' '}
      <SideBar />
      <Box sx={{ width: '100%' }}>
        <Header title="Admin - Matron Management" />
        <Grid container spacing={2} style={{ padding: '3vh' }}>
          <Grid item sx={6}>
            <DefaultButton
              title="Add Matron"
              width="10vw"
              height="50px"
              onClick={() => setIsAddMatronOpen(true)}
            />
          </Grid>
          <AddMatron
            open={isAddMatronOpen}
            handleClose={() => setIsAddMatronOpen(false)}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default MatronManagement
