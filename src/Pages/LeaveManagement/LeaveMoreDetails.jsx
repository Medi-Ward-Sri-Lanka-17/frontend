import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import SideBar from '../../Component/SideBar'
import Header from '../../Component/Header'
import { useParams } from 'react-router-dom'

const LeaveMoreDetails = (prop) => {
  const theme = useTheme()
  const { leaveId } = useParams()
  const [userDetails, setUserDetails] = useState({
    name: 'Dilki Hansapani',
    leaveBeginDate: '2024-02-12',
    leaveEnddate: '2024-02-16',
    remainingCasualityLeave: '20',
    reamainingVacationLeave: '21',
    noOfTotalLeaveCurrentMounth: '4',
    requestedDate: '2024-01-21',
  })
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="LEAVE APPROVE - MORE" />
        <Grid
          container
          spacing={2}
          sx={{ width: '90%' }}
          style={{ marginLeft: '20px', marginRight: '20px' }}
        >
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Leave No
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="leaveNo"
              defaultValue={leaveId}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Name
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              defaultValue={userDetails.name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Leave Requested Date
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              defaultValue={userDetails.requestedDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Starting Date of the Leave
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              defaultValue={userDetails.leaveBeginDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Ending Date of the Leave
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="leaveNo"
              defaultValue={userDetails.leaveEnddate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              No of Total Leave in the Mounth
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              defaultValue={userDetails.noOfTotalLeaveCurrentMounth}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Remaining Casuality Leave
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              defaultValue={userDetails.remainingCasualityLeave}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Remaining Vacational Leave
            </InputLabel>
            <TextField
              id="leaveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              defaultValue={userDetails.reamainingVacationLeave}
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
