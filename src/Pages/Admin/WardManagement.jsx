import { Grid } from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import SideBar from '../../Component/SideBar'
import Header from '../../Component/Header'
import DefaultButton from '../../Component/Button/DefaultButton'
import DeclineButton from '../../Component/Button/DeclineButton'
import DataGridComponent from '../../Component/DataGridComponent'

import AddNewWardForm from '../../Component/Forms/newWard'
import { retriveAllWards } from '../../Services/WardDetails/WardDetailsServices'

const StaffManagement = () => {
  const [isAddWardOpen, setIsAddWardOpen] = useState(false)
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

  const handleNewWardForm = () => {
    setIsAddWardOpen(false)
  }

  const columns = [
    {
      field: 'wardNo',
      headerName: 'Ward No.',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'wardName',
      headerName: 'Ward Name',
      width: 250,
      headerClassName: 'colored-data-grid',
    },

    {
      field: 'numberOfNurses',
      headerName: 'Number of Nurses',
      width: 150,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'matronName',
      headerName: 'Matron Name',
      width: 200,
      headerClassName: 'colored-data-grid',
    },
    {
      field: 'sisterName',
      headerName: 'sister Name',
      width: 200,
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
      let wards = await retriveAllWards()
      setRows(wards)
    }

    fetchWardData()
  }, [])

  React.useEffect(() => {}, [ward])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
        <Header title="Admin - Matron Management" />
        <Grid container spacing={2} style={{ padding: '3vh' }}>
          <Grid item xs={6}>
            <DefaultButton
              title="Add new Ward"
              width="10vw"
              height="50px"
              onClick={() => setIsAddWardOpen(true)}
            />
          </Grid>

          <Grid item xs={12}>
            <DataGridComponent
              totalWidth={totalWidth}
              rows={rows}
              columns={columns}
              getRowId={(row) => row.wardNo}
            />
          </Grid>

          <AddNewWardForm
            open={isAddWardOpen}
            handleClose={() => setIsAddWardOpen(false)}
            handleWardDetails={handleNewWardForm}
          />
        </Grid>
      </Box>
    </Box>
  )
}

export default StaffManagement
