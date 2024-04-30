import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import SideBar from '../../Component/SideBar'
import Header from '../../Component/Header'
import Theme from '../../Component/Theme'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultButton from '../../Component/Button/DefaultButton'
import { useAuth } from '../../Security/AuthContext'

const WardManagementMore = () => {


//..................................Profile Picture...........................................................

const authContext=useAuth();
const proImgUrl=authContext.proPicUrl;

//............................................................................................................


  const theme = Theme()
  const { wardNumber } = useParams()
  const navigate = useNavigate()

  const [initialValue, setInitialValue] = useState({
    wardNo: wardNumber,
    wardName: '',
    matronName: '',
    matronNic: '',
    numberOfNurses: '',
  })

  const handleBackButton = () => {}

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
          <Header title="Admin - Ward Management" proImgUrl={proImgUrl}/>
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
            <Grid item xs={12}>
              <Typography>Update Ward Details</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default WardManagementMore
