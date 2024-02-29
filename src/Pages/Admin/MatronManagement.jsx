import { Grid } from '@mui/material'
import { useState } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import SideBar from '../../Component/SideBar'
import AddMatron from '../../Component/Forms/AddMatron'
import Header from '../../Component/Header'
import DefaultButton from '../../Component/Button/DefaultButton'

const MatronManagement = () => {
  const [isAddMatronOpen, setIsAddMatronOpen] = useState(false)

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

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box sx={{ width: '100%' }}>
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
