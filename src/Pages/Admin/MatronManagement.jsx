import { Grid } from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import SideBar from '../../Component/SideBar'
import AddMatron from '../../Component/Forms/AddMatron'
import Header from '../../Component/Header'
import DefaultButton from '../../Component/Button/DefaultButton'
import SuccessButton from '../../Component/Button/SuccessButton'
import DeclineButton from '../../Component/Button/DeclineButton'
import DataGridComponent from '../../Component/DataGridComponent'

import {
  deleteMatron,
  getMatronDetails,
} from '../../Services/Admin/AdminMatronServices'
import { showSuccessAlert } from '../../Component/ShowAlert'

const MatronManagement = () => {
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
        if (response.status === '200') {
          var message = 'Delete Data of the metron : ' + response.data
          showSuccessAlert(message)
          setDeleteTrigger((prev) => !prev)
        } else {
        }
      })
      .catch((error) => {
        console.error(error)
      })
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
      width: 290,
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
        <Header title="Admin - Matron Management" />
        <Grid container spacing={2} style={{ padding: '3vh' }}>
          <Grid item xs={6}>
            <DefaultButton
              title="Add Matron"
              width="10vw"
              height="50px"
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
