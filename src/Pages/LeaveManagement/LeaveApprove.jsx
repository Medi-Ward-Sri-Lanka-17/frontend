import React, { useState } from 'react'
import Header from '../../Component/Header'
import SideBar from '../../Component/SideBar'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid'
import Theme from '../../Component/Theme'

const LeaveApprove = () => {
  // Load theme into the page
  const theme = Theme()

  // To get ward no using selection
  const [wardNo, setWardNo] = useState(null)

  // for select the ward no
  const handleChangeOnSelection = (event) => {
    setWardNo(event.target.value)
  }

  const columns = [
    {
      field: 'leaveId',
      headerName: 'Leave ID',
      width: 100,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'leaveNo',
      headerName: 'Leave No',
      width: 100,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'leaveDate',
      headerName: 'Leave Date',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'noOfLeaves',
      headerName: 'No Of Leaves',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'requestedDate',
      headerName: 'Requested Date',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'moreDetails',
      headerName: 'More Details',
      width: 100,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 100,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'decline',
      headerName: 'Decline',
      width: 100,
      headerClassName: 'colored-data-grid',
    },
  ]

  const rows = []

  // Calculate the total width of all columns
  const totalWidth = columns.reduce((acc, column) => acc + column.width, 0)

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="LEAVE APPROVE" />
        <Grid container spacing={2} style={{ marginTop: '2vh' }}>
          <Grid item xs={3} sx={{ marginLeft: '5vh' }}>
            <Typography variant="p" sx={{ fontWeight: '500' }}>
              Ward No:
            </Typography>
            <FormControl
              sx={{ minWidth: 160 }}
              style={{ marginLeft: '3vh', marginTop: '-1vh' }}
              size="small"
            >
              <InputLabel id="ward-no-label">Select Ward No</InputLabel>
              <Select
                labelId="ward-no-label"
                id="ward-no"
                value={wardNo}
                label="Select Ward No"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '1vh' }}>
            <Paper
              style={{
                width: '100%',
                overflowX: 'auto',
                margin: 'auto',
                maxWidth: totalWidth + 'px', // Set the total width of columns
              }}
            >
              <DataGrid
                ableColumnFilter
                disableColumnSelector
                disableDensitySelector
                columns={columns}
                rows={rows}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 15, 25]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                sx={{
                  height: '75vh',
                  [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                    {
                      outline: 'none',
                    },
                  [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                      outline: 'none',
                    },
                  '& .colored-data-grid': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LeaveApprove
