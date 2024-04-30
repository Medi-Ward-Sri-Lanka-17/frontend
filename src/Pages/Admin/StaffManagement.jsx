import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import Matron from '../../Component/wardDetails/WardManagement'
import WardManagement from '../../Component/wardDetails/WardManagement'
import { useAuth } from '../../Security/AuthContext'

const StaffManagement = () => {



//..................................Profile Picture...........................................................

const authContext=useAuth();
const proImgUrl=authContext.proPicUrl;

//............................................................................................................


  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="WARD DETAILS" proImgUrl={proImgUrl}/>
        <WardManagement />
      </div>
    </Box>
  )
}

export default StaffManagement
