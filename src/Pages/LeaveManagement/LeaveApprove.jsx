import React, { useEffect, useState } from 'react'
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
import { Button } from '@mui/base'
import DefaultButton from '../../Component/Button/DefaultButton'
import SuccessButton from '../../Component/Button/SuccessButton'
import DeclineButton from '../../Component/Button/DeclineButton'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Security/AuthContext'

const LeaveApprove = () => {
  // Load theme into the page
  const theme = Theme()

  // To get ward no using selection
  const [wards, setWards] = useState([])
  const [wardNo, setWardNo] = useState('All')
  const [rows, setRows] = useState([])
  const [position, setPosition] = useState('All')

  // Use naviagete
  const navigate = useNavigate()

  //use context
  const authContext = useAuth()

  // for select the ward no
  const handleChangeOnSelection = (event) => {
    setWardNo(event.target.value)
  }

  // More button aciton on click
  const handleButton = (selectedRow) => {
    console.log('Selected Row Details:', selectedRow)
    const leaveId = selectedRow.leaveId
    navigate(`/leave/approve/${leaveId}`)
  }
  // Decline button aciton on click
  const handleDeclineButton = (selectedRow) => {
    console.log('Selected Row Details:', selectedRow)
    console.log(authContext.token)
    console.log(authContext.position)
  }
  // Approve button aciton on click
  const handleApproveButton = (selectedRow) => {
    console.log('Selected Row Details:', selectedRow)
  }

  //Handle changes in filters

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }

  //working when page loading
  useEffect(() => {}, [])

  //Define tempory Raws in datagrid
  // const rows =
  // [
  //   {
  //     id: 1,
  //     leaveId: 'L001',
  //     leaveNo: 'LN001',
  //     name: 'John Doe',
  //     leaveDate: '2022-12-01',
  //     leaveEndDate: '2022-12-05',
  //     requestedDate: '2022-11-25',
  //   },
  //   {
  //     id: 2,
  //     leaveId: 'L002',
  //     leaveNo: 'LN002',
  //     name: 'Jane Doe',
  //     leaveDate: '2022-12-05',
  //     leaveEndDate: '2022-12-10',
  //     requestedDate: '2022-11-28',
  //   },
  //   {
  //     id: 3,
  //     leaveId: 'L003',
  //     leaveNo: 'LN003',
  //     name: 'Bob Smith',
  //     leaveDate: '2022-12-10',
  //     leaveEndDate: '2022-12-15',
  //     requestedDate: '2022-12-01',
  //   },
  //   {
  //     id: 4,
  //     leaveId: 'L004',
  //     leaveNo: 'LN004',
  //     name: 'Alice Johnson',
  //     leaveDate: '2022-12-15',
  //     leaveEndDate: '2022-12-20',
  //     requestedDate: '2022-12-05',
  //   },
  //   {
  //     id: 5,
  //     leaveId: 'L005',
  //     leaveNo: 'LN005',
  //     name: 'Charlie Brown',
  //     leaveDate: '2022-12-20',
  //     leaveEndDate: '2022-12-25',
  //     requestedDate: '2022-12-10',
  //   },
  // ]

  //Define Columns of the DataGrid

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
      headerName: 'Leave Start Date',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'leaveEndDate',
      headerName: 'Leave End Date',
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
      field: 'More', // New column for custom button
      headerName: 'MoreActions',
      headerClassName: 'colored-data-grid',
      width: 100,
      renderCell: (params) => (
        <DefaultButton
          title="More"
          height="35px"
          width="80px"
          onClick={() => handleButton(params.row)}
        />
      ),
    },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 100,
      headerClassName: 'colored-data-grid',
      renderCell: (params) => (
        <SuccessButton
          title="Approve"
          width="80px"
          height="35px"
          onClick={() => handleApproveButton(params.row)}
        />
      ),
    },
    {
      field: 'decline',
      headerName: 'Decline',
      width: 100,
      headerClassName: 'colored-data-grid',
      renderCell: (params) => (
        <DeclineButton
          title="Decline"
          onClick={() => handleDeclineButton(params.row)}
        />
      ),
    },
  ]

  // Calculate the total width of all columns
  const totalWidth = columns.reduce((acc, column) => acc + column.width, 0)

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="LEAVE APPROVE" />
        <Grid container spacing={2} style={{ marginTop: '4vh' }}>
          <Grid item xs={6} style={{ paddingLeft: '6vw' }}>
            <Typography variant="p" sx={{ fontWeight: '400' }}>
              Filter By Ward No:
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
                <MenuItem value="All" defaultChecked>
                  <em>All</em>
                </MenuItem>
                {wards.map((ward) => (
                  <MenuItem key={ward.id} value={ward.wardNo}>
                    {ward.wardNo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ marginLeft: 'auto', textAlign: 'right' }}
            style={{ paddingRight: '6vw' }}
          >
            <Typography variant="p" sx={{ fontWeight: '400' }}>
              Filter by Position:
            </Typography>
            <FormControl
              sx={{ minWidth: 160 }}
              style={{ marginLeft: '3vh', marginTop: '-1vh' }}
              size="small"
            >
              <InputLabel id="ward-no-label">Select Position</InputLabel>
              <Select
                labelId="ward-no-label"
                id="ward-no"
                value={position}
                label="Select Ward No"
                onChange={handlePositionChange}
              >
                <MenuItem value="All" defaultChecked>
                  <em>All</em>
                </MenuItem>
                <MenuItem value="Sister">
                  <em>Sisters</em>
                </MenuItem>
                <MenuItem value="Nurse">
                  <em>Nurses</em>
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
                disableColumnFilter
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
