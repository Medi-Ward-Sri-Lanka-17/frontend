import { Avatar, Badge, Box, Grid, IconButton } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
// import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate()
  //   //for set the number of notifications
  //   // const [numberOfNotifications, setNumberOfNotifications] = useState(0)

  //   //get auth context and get details from authContext

  const handleOnClick = (event) => {
    navigate('/profile')
  }

  return (
    <div>
      <Box
        component="div"
        sx={{
          '& .MuiTextField-root': { m: 1 },
          '& .MuiButton-root': { m: 1 },
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingTop: '10px',
        }}
        noValidate
        autoComplete="off"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h3 style={{ color: '#243E4F' }}>{props.title}</h3>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <IconButton aria-label="notifications" sx={{ marginRight: '40px' }}>
              <Badge badgeContent={4} color="error">
                <NotificationsActiveIcon
                  style={{ color: '#243E4F', fontSize: 35 }}
                />
              </Badge>
            </IconButton>

            <Avatar
              sx={{ bgcolor: deepOrange[500], cursor: 'pointer' }}
              //navigate to the profile page
              onClick={handleOnClick}
            >
              DW
            </Avatar>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Header
