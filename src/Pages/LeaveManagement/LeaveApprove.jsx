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
import {
  approveLeaveByMatron,
  approveLeaveBySister,
  declineLeaveRequest,
  getRequestLeaveDetails,
  getWardList,
} from '../../Services/LeaveManagement/LeaveApproveServices'
import { retrieveProfilePicture } from '../../Services/Home/retrieveProfilePicture'

const LeaveApprove = () => {


    //.............................................Load Profile Picture........................................................

    const authContext = useAuth()
    const nic = authContext.nic
  
    const [proImgUrl,setProImgUrl]=useState(null)
  
    useEffect(()=>{
      refreshPropilePicture(nic) 
   },[])
  
    useEffect(() => {
      refreshPropilePicture(nic)
    }, [])
  
    async function refreshPropilePicture(nic) {
      const response = await retrieveProfilePicture(nic)
      setProImgUrl(response)
    }
  
  //............................................................................................................................


  // Load theme into the page
  const theme = Theme()

  // To get ward no using selection
  const [wards, setWards] = useState([])
  const [wardNo, setWardNo] = useState('All')
  const [rows, setRows] = useState([])
  const [position, setPosition] = useState('All')
  const [isApprovedBtnTrigger, setIsApprovedBtnTrigger] = useState(false)
  const [isDeclineBtnTrigger, setIsDeclineBtnTrigger] = useState(false)

  // Use naviagete
  const navigate = useNavigate()

  //use context
  // const authContext = useAuth()

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
  const handleDeclineButton = async (selectedRow) => {
    declineLeaveRequest(selectedRow.leaveId).then(() => {
      setIsDeclineBtnTrigger((Prev) => !Prev)
    })
  }
  // Approve button aciton on click
  const handleApproveButton = async (selectedRow) => {
    if (authContext.position === 'Sister') {
      approveLeaveBySister(selectedRow.leaveId).then(() => {
        setIsApprovedBtnTrigger((Prev) => !Prev)
      })
      setIsApprovedBtnTrigger((Prev) => !Prev)
    } else if (authContext.position === 'Matron') {
      approveLeaveByMatron(selectedRow.leaveId).then(() => {
        setIsApprovedBtnTrigger((Prev) => !Prev)
      })
      setIsApprovedBtnTrigger((Prev) => !Prev)
    }

    setIsApprovedBtnTrigger((Prev) => !Prev)
  }

  //Handle changes in filters

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }

  //working when page loading
  useEffect(() => {
    const fetchWardList = async () => {
      var nic = authContext.user.nic
      var wardList = await getWardList(nic, authContext.position)
      setWards(wardList || [])
      console.log(wardList)
    }

    const fetchRequestLeaveDetails = async () => {
      var nic = authContext.user.nic
      try {
        const leaveDetails = await getRequestLeaveDetails(nic, position, wardNo)
        setRows(leaveDetails || [])
      } catch (err) {
        console.error('Failed to fetch leave details:', err)
        setRows([])
      }
    }

    fetchWardList()
    fetchRequestLeaveDetails()
  }, [wardNo, position, isApprovedBtnTrigger, isDeclineBtnTrigger])

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
        <Header title="LEAVE APPROVE" proImgUrl={proImgUrl} />
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
                onChange={handleChangeOnSelection}
              >
                <MenuItem value="All">
                  <em>All</em>
                </MenuItem>
                {wards.map((ward) => (
                  <MenuItem key={ward} value={ward}>
                    {ward}
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
                getRowId={(row) => row.leaveId}
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
