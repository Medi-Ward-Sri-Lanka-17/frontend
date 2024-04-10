import React from 'react'
import Theme from '../Theme'
import { Button } from '@mui/material'

const theme = Theme()

const DeclineButton = (props) => {
  return (
    <>
      <Button
        style={{
          height: props.height,
          width: props.width,
        }}
        endIcon={props.iconEnd}
        startIcon={props.iconStart}
        variant="outlined"
        color="error"
        size="small"
        onClick={props.onClick}
      >
        {props.title}
      </Button>
    </>
  )
}

export default DeclineButton
