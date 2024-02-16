import React, { useState } from 'react'
import SideBar from '../../Component/SideBar'
import { Box, Grid, InputLabel, TextField } from '@mui/material'
import Header from '../../Component/Header'
import Theme from '../../Component/Theme'
import { useNavigate, useParams } from 'react-router-dom'
import DataGrid from '../../Component/DataGridComponent'
import DataGridComponent from '../../Component/DataGridComponent'
import DefaultButton from '../../Component/Button/DefaultButton'

const LeaveMoreDetails = (props) => {
  const theme = Theme()
  const { leaveId } = useParams()
  const navigate = useNavigate()

  //Handle button function
  const handleBackButton = () => {
    navigate('/leave/approve')
  }

  const [userDetails, setUserDetails] = useState({
    name: 'Dilki Hansapani',
    leaveBeginDate: '2024-02-12',
    leaveEnddate: '2024-02-16',
    remainingCasualityLeave: '20',
    reamainingVacationLeave: '21',
    noOfTotalLeaveCurrentMounth: '4',
    requestedDate: '2024-01-21',
  })

  const columns = [
    {
      field: 'leaveId',
      headerName: 'Leave ID',
      width: 200,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'leaveBeginDate',
      headerName: 'Begin Date of the leave',
      width: 200,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'numOfLeaveDays',
      headerName: 'Number of Leave Days',
      width: 200,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 500,
      headerClassName: 'colored-data-grid',
    },
  ]

  const row = []

  const totalWidth = columns.reduce((acc, column) => acc + column.width, 0)

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
          <Grid item xs={12}>
            <DefaultButton
              title="Back"
              width="100px"
              height="35px"
              onClick={() => handleBackButton()}
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
          <Grid item xs={12}>
            <InputLabel
              htmlFor="leaveId"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Reason
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
          <Grid item xs={12}>
            <DataGridComponent
              columns={columns}
              rows={row}
              totalWidth={totalWidth}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LeaveMoreDetails
