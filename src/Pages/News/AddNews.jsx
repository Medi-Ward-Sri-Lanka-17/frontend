import React from 'react'
import Header from '../../Component/Header'
import { Box } from '@mui/material'
import SideBar from '../../Component/SideBar'
import AddNewsForm from '../../Component/NewsPost/AddNewsForm'
import './AddNew.css'

const AddNews = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <div className="PageContent" style={{ width: '100%' }}>
        <Header title="ADD NEWS"/>
        <div className='form-container'>
          <div>
            <h1 className='title'>Publish Your News Here</h1>
          </div>
          <AddNewsForm/>
        </div>
      </div>
    </Box>
  )
}

export default AddNews
