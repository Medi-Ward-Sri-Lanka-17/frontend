import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import SideBar from '../../Component/SideBar'
import Header from '../../Component/Header'
import { useParams } from 'react-router-dom'

const LeaveMoreDetails = (prop) => {
  const { leaveId } = useParams()
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="LEAVE APPROVE - MORE" />
        <div>{leaveId}</div>
        <Grid
          container
          spacing={2}
          sx={{ width: '90%' }}
          style={{ marginLeft: '20px', marginRight: '20px' }}
        >
          <Grid item xs={6}>
            Leave ID :
            <TextField
              id="leaveId"
              defaultValue={leaveId}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LeaveMoreDetails
