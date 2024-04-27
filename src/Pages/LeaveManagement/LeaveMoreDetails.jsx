import React, { useEffect, useState } from 'react'
import SideBar from '../../Component/SideBar'
import { Box, Grid, InputLabel, TextField, Typography } from '@mui/material'
import Header from '../../Component/Header'
import Theme from '../../Component/Theme'
import { useNavigate, useParams } from 'react-router-dom'
import DataGrid from '../../Component/DataGridComponent'
import DataGridComponent from '../../Component/DataGridComponent'
import DefaultButton from '../../Component/Button/DefaultButton'
import {
  getMoreLeaveDetails,
  getPreiousLeaveDetails,
} from '../../Services/LeaveManagement/LeaveApproveServices'

const LeaveMoreDetails = (props) => {
  const theme = Theme()
  const { leaveId } = useParams()
  const navigate = useNavigate()

  //Handle button function
  const handleBackButton = () => {
    navigate('/leave/approve')
  }

  const [userDetails, setUserDetails] = useState({
    name: '',
    leaveBeginDate: '',
    leaveEndDate: '',
    remainingCasualLeaves: 0,
    remainingVacationLeave: 0,
    totalLeaveOfTheMonth: 0,
    requestedDate: '',
    reason: '',
  })
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMoreLeaveDetails(leaveId)
        setUserDetails(data)
      } catch (error) {
        console.error('Error fetching leave details:', error)
      }
    }

    const fetchRows = async (leaveId) => {
      try {
        var data = await getPreiousLeaveDetails(leaveId)
        console.log(data)
        setRows(data)
      } catch (error) {
        setRows([])
        console.error('Error fetching leave details:', error)
      }
    }

    fetchData()
    fetchRows(leaveId)
  }, [leaveId])
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
      field: 'numberOfLeaveDays',
      headerName: 'Number of Leave Days',
      width: 200,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'reason',
      headerName: 'Description',
      width: 400,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'leaveStatus',
      headerName: 'Status',
      width: 100,
      headerClassName: 'colored-data-grid',
    },
  ]

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
              value={userDetails.leaveId}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="name"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Name
            </InputLabel>
            <TextField
              id="name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.name}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="requestLeaveDate"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Leave Requested Date
            </InputLabel>
            <TextField
              id="requestLeaveDate"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.requestedDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveBeginDate"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Starting Date of the Leave
            </InputLabel>
            <TextField
              id="leaveBeginDate"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.leaveBeginDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="leaveEndDate"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Ending Date of the Leave
            </InputLabel>
            <TextField
              id="leaveEndDate"
              variant="outlined"
              fullWidth
              margin="normal"
              name="leaveNo"
              value={userDetails.leaveEndDate}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="totalLeaveOfTheMonth"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              No of Total Leave in the Mounth
            </InputLabel>
            <TextField
              id="totalLeaveOfTheMonth"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.totalLeaveOfTheMonth}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="remainingCasualLeaves"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Remaining Casuality Leave
            </InputLabel>
            <TextField
              id="learemainingCasualLeavesveId"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.remainingCasualLeaves}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              htmlFor="remainingVacationLeave"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Remaining Vacational Leave
            </InputLabel>
            <TextField
              id="remainingVacationLeave"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.remainingVacationLeave}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              htmlFor="reason"
              style={{
                fontSize: '16px',
                marginBottom: '1px',
                color: theme.palette.primary.light,
              }}
            >
              Reason
            </InputLabel>
            <TextField
              id="reason"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={userDetails.reason}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            {rows && rows.length > 0 ? (
              <DataGridComponent
                columns={columns}
                rows={rows}
                totalWidth={totalWidth}
                getRowId={(row) => row.leaveId}
              />
            ) : (
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                No previous leave data available
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LeaveMoreDetails
