import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import SideBar from '../../Component/SideBar'
import AddMatron from '../../Component/Forms/AddMatron'
import Header from '../../Component/Header'
import DefaultButton from '../../Component/Button/DefaultButton'
import DeclineButton from '../../Component/Button/DeclineButton'
import DataGridComponent from '../../Component/DataGridComponent'
import { retrieveWardNumbers } from '../../Services/WardDetails/WardDetailsServices'

const StaffManagement = () => {
  const [isAddMatronOpen, setIsAddMatronOpen] = useState(false)
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [rows, setRows] = useState([])
  const [deleteTrigger, setDeleteTrigger] = useState(false)
  const [editTrigger, seteditTrigger] = useState(false)
  const [wards, setWards] = useState([])
  const [ward, setWard] = useState('')

  // More button aciton on click
  const handleEdit = (selectedRow) => {
    seteditTrigger((prev) => !prev)
  }
  // Decline button aciton on click
  const handleDeleteButton = (selectedRow) => {
    setDeleteTrigger((prev) => !prev)
  }

  //Handle change function in ward filter
  const handleChangeWard = (event) => {
    setWard(event.target.value)
  }

  const initialValuesForSave = {
    nic: '',
    fullName: '',
    firstName: '',
    lastName: '',
    serviceDate: '',
    dob: '',
    email: '',
    mobileNo: '',
  }

  const columns = [
    {
      field: 'nic',
      headerName: 'Service ID',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 300,
      headerClassName: 'colored-data-grid',
    },

    {
      field: 'email',
      headerName: 'Email',
      width: 350,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'mobileNo',
      headerName: 'Mobile No.',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'edit', // New column for custom button
      headerName: 'Edit',
      headerClassName: 'colored-data-grid',
      width: 100,
      renderCell: (params) => (
        <DefaultButton
          title="More"
          height="35px"
          width="80px"
          onClick={() => handleEdit(params.row)}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Detele',
      width: 100,
      headerClassName: 'colored-data-grid',
      renderCell: (params) => (
        <DeclineButton
          title="Delete"
          onClick={() => handleDeleteButton(params.row)}
        />
      ),
    },
  ]

  // Calculate the total width of all columns
  const totalWidth = columns.reduce((acc, column) => acc + column.width, 0)

  React.useEffect(() => {
    const fetchWardData = async () => {
      var response = await retrieveWardNumbers()
      var wardArray = response.wardNumbers
      setWards(wardArray)
    }

    fetchWardData()
  }, [])

  React.useEffect(() => {}, [ward])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="Admin - Matron Management" />
        <Grid
          container
          spacing={2}
          style={{ padding: '3vh', paddingLeft: '6vw' }}
        >
          <Grid item xs={6}>
            <DefaultButton
              title="Add Staff Member"
              width="11vw"
              height="50px"
              onClick={() => setIsAddStaffOpen(true)}
            />
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ marginLeft: 'auto', textAlign: 'right' }}
            style={{ paddingRight: '6vw', paddingTop: '3vh' }}
          >
            <Typography variant="p" sx={{ fontWeight: '400' }}>
              Ward:
            </Typography>
            <FormControl
              sx={{ minWidth: 160 }}
              style={{ marginLeft: '3vh', marginTop: '-1vh' }}
              size="small"
            >
              <InputLabel id="ward-no-label">Select Ward</InputLabel>
              <Select
                labelId="ward-no-label"
                id="ward-no"
                value={ward}
                label="Select Ward No"
                onChange={handleChangeWard}
              >
                {wards.map((wardNumber) => (
                  <MenuItem key={wardNumber} value={wardNumber}>
                    {wardNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <DataGridComponent
              totalWidth={totalWidth}
              rows={rows}
              columns={columns}
              getRowId={(row) => row.nic}
            />
          </Grid>

          <AddMatron
            open={isAddStaffOpen}
            handleClose={() => setIsAddStaffOpen(false)}
            initialValues={initialValuesForSave}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default StaffManagement
