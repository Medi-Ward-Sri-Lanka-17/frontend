import { Grid } from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import SideBar from '../../Component/SideBar'
import AddMatron from '../../Component/Forms/AddMatron'
import Header from '../../Component/Header'
import DefaultButton from '../../Component/Button/DefaultButton'
import DeclineButton from '../../Component/Button/DeclineButton'
import DataGridComponent from '../../Component/DataGridComponent'

import {
  deleteMatron,
  getMatronDetails,
} from '../../Services/Admin/AdminMatronServices'
import { showSuccessAlert, showUnsuccessAlert } from '../../Component/ShowAlert'
import { useAuth } from '../../Security/AuthContext'

const MatronManagement = () => {

  const authContext=useAuth();
  const proImgUrl=authContext.proPicUrl;

  const [isAddMatronOpen, setIsAddMatronOpen] = useState(false)
  const [rows, setRows] = useState([])
  const [deleteTrigger, setDeleteTrigger] = useState(false)
  const [editTrigger, seteditTrigger] = useState(false)

  // More button aciton on click
  const handleEdit = (selectedRow) => {
    seteditTrigger((prev) => !prev)
  }
  // Decline button aciton on click
  const handleDeleteButton = (selectedRow) => {
    deleteMatron(selectedRow.nic)
      .then((response) => {
        var message = 'Delete Data of the metron : ' + response.data
        showSuccessAlert(message)
        setDeleteTrigger((prev) => !prev)
      })
      .catch((error) => {})
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
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 330,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'mobileNo',
      headerName: 'Mobile No.',
      width: 170,
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
    const fetchMAtronDetails = async () => {
      try {
        const response = await getMatronDetails()
        setRows(response.data)
        console.log(response)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMAtronDetails()
  }, [isAddMatronOpen, deleteTrigger, editTrigger])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="Admin - Matron Management" proImgUrl={proImgUrl}/>
        <Grid
          container
          spacing={2}
          style={{ padding: '3vh', paddingLeft: '6vw' }}
        >
          <Grid item xs={6}>
            <DefaultButton
              title="Add Matron"
              width="8vw"
              height="45px"
              onClick={() => setIsAddMatronOpen(true)}
            />
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
            open={isAddMatronOpen}
            handleClose={() => setIsAddMatronOpen(false)}
            initialValues={initialValuesForSave}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default MatronManagement
