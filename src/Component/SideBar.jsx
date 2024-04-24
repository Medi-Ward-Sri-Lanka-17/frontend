import {
  Collapse,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import mainlogo from '../Assest/mainlogo.png'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { matronsMenus, menus, menusForAdmin } from '../Data/SideBarData'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { auto } from '@popperjs/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Security/AuthContext'

const drawerWidth = 260

const SideBar = () => {
  const naviagate = useNavigate()
  const [openMenus, setOpenMenus] = useState({})
  const authContext = useAuth()

  const handleClick = (menuName) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menuName]: !prevOpenMenus[menuName],
    }))
  }

  const handleClickForNavigate = (path) => {
    naviagate(path)
  }

  var sideBarHander //= authContext.position == 'Admin' ? menusForAdmin : menus
  if (authContext.position == 'Admin') {
    sideBarHander = menusForAdmin
  } else if (authContext.position == 'Matron') {
    sideBarHander = matronsMenus
  } else {
    sideBarHander = menus
  }
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#243E4F', // Set the background color to your desired color
          color: 'white', // Set the text color to white
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80px',
          marginTop: '10px',
          padding: '30px',
        }}
      >
        <img src={mainlogo} alt="Logo" style={{ width: '80%' }} />
      </div>
      <List sx={{ paddingTop: '20px' }}>
        {sideBarHander.map((menu) => (
          <React.Fragment key={menu.name}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={
                  menu.subMenu
                    ? () => handleClick(menu.name)
                    : () => handleClickForNavigate(menu.path)
                }
                selected={openMenus[menu.name]}
              >
                <ListItemIcon style={{ color: 'white' }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
                {menu.subMenu &&
                  (openMenus[menu.name] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {menu.subMenu && (
              <Collapse in={openMenus[menu.name]} timeout={auto} unmountOnExit>
                <List component="div" disablePadding>
                  {menu.subMenu.map((subItem) => (
                    <ListItem
                      key={subItem.name}
                      sx={{ backgroundColor: '#2A4C62' }}
                      disablePadding
                    >
                      <ListItemButton
                        onClick={() => handleClickForNavigate(subItem.path)}
                      >
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <List sx={{ marginTop: 'auto' }}>
        <ListItem>
          <ListItemButton onClick={() => handleClickForNavigate('/login')}>
            <ListItemText primary="Logout" />
            <ListItemIcon style={{ color: 'white' }}>
              <LogoutRoundedIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default SideBar
