import { Button } from '@mui/material'
import React from 'react'
import Theme from '../Theme'

const theme = Theme()

const MoreButton = (props) => {
  return (
    <>
      <Button
        style={{
          backgroundColor: theme.palette.secondary.main,
          height: '35px',
        }}
        variant="contained"
        size="small"
        onClick={props.onClick}
      >
        MORE
      </Button>
    </>
  )
}

export default MoreButton
