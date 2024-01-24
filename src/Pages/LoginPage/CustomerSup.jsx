
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Theme from '../../Component/Theme';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom'
import { BtnTypography } from './Recovery';

const theme=Theme();

const Overly=styled(Stack)(({})=>({
    position:"fixed",
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0, 0.7)',
    zIndex:1000
}))

const ModelStack=styled(Stack)(({})=>({
    zIndex:1000,

}))


const Styledstack=styled(Stack)(({theme})=>({
    width:"80%",
    [theme.breakpoints.down("md")]:{
        width:350,
    },
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center"

}))

const TitleBox=styled(Box)(({theme})=>({
    textAlign:"center",
    width:"80%",
    [theme.breakpoints.down("md")]:{
        width:350,
    }
}))

export default function CustomerSup({closeCustom,responseSuccessAlert}) {
  return ReactDOM.createPortal(
    <Overly>
        <Stack justifyContent="center" alignItems="center" sx={{

        }}>
            <ModelStack
            sx={{
                marginTop:"7em",
                backgroundColor:theme.palette.background.paper,
                width:500,
                height:"75vh",
                borderRadius:theme.shape.borderRadius*0.5,
                overflow:"hidden",
                overflowY:"auto",
                }}
            >
                <Stack display="flex" direction="row" justifyContent='end'>
                    <Button
                        variant="contained" 
                        onClick={()=>closeCustom(false)}
                    ><Typography variant='h5'>X</Typography>
                    </Button>
            </Stack>

                <Stack textAlign="center" alignItems="center" spacing={1} sx={{marginTop:"15px"}}>
                
                <TitleBox>
                    <Typography variant="h5">Customer Support</Typography>
                </TitleBox>


                <Stack spacing={2} textAlign="left" sx={{
                    width:"80%",
                    [theme.breakpoints.down("md")]:{
                        width:350,
                    },
                    }}>
                    <Typography variant='h6'>Name:</Typography>
                </Stack>

                <Styledstack>
                <TextField id="otp" name="otp" variant="outlined" size='small' placeholder="Enter your name"
                                        type="text"
                                        sx={{
                                            size:'small',
                                            width:"100%",
                                            borderRadius:theme.shape.borderRadius,
                                            "&:hover":{
                                                borderBlockColor:theme.palette.success.main
                                            }
                                            }}
                                        />
                </Styledstack>

                <Stack spacing={2} textAlign="left" sx={{
                    width:"80%",
                    [theme.breakpoints.down("md")]:{
                        width:350,
                    },
                    }}>
                    <Typography variant='h6'>Username:</Typography>
                </Stack>

                <Styledstack>
                <TextField id="otp" name="otp" variant="outlined" size='small' placeholder="Enter your username"
                                        type="text"
                                        sx={{
                                            size:'small',
                                            width:"100%",
                                            borderRadius:theme.shape.borderRadius,
                                            "&:hover":{
                                                borderBlockColor:theme.palette.success.main
                                            }
                                            }}
                                        />
                </Styledstack>

                <Stack spacing={2} textAlign="left" sx={{
                    width:"80%",
                    [theme.breakpoints.down("md")]:{
                        width:350,
                    },
                    }}>
                    <Typography variant='h6'>Email Address:</Typography>
                </Stack>

                <Styledstack>
                <TextField id="otp" name="otp" variant="outlined" size='small' placeholder="Enter email address"
                                        type="text"
                                        sx={{
                                            size:'small',
                                            width:"100%",
                                            borderRadius:theme.shape.borderRadius,
                                            "&:hover":{
                                                borderBlockColor:theme.palette.success.main
                                            }
                                            }}
                                        />
                </Styledstack>

                <Stack spacing={2} textAlign="left" sx={{
                    width:"80%",
                    [theme.breakpoints.down("md")]:{
                        width:350,
                    },
                    }}>
                    <Typography variant='h6'>Desciption:</Typography>
                </Stack>

                <Styledstack>
                <TextField id="otp" name="otp" variant="outlined" size='small' placeholder="Type your problems here...."
                                        type="text"
                                        multiline
                                        rows={4}
                                        sx={{
                                            size:'small',
                                            width:"100%",
                                            borderRadius:theme.shape.borderRadius,
                                            "&:hover":{
                                                borderBlockColor:theme.palette.success.main
                                            }
                                            }}
                                        />
                </Styledstack>

                <Stack justifyContent="center" alignItems="center" sx={{
            
                width:"80%",
                [theme.breakpoints.down("md")]:{
                    width:350,
                },
            }}
            >
                <Button
                    variant="contained" 
                    sx={{
                        width:"100%",
                        "&:hover":{
                            backgroundColor:theme.palette.secondary.main,
                        }
                        
                    }}
                    onClick={()=>responseSuccessAlert()}
                >
                        <BtnTypography>Submit Response</BtnTypography>
                </Button>
            </Stack>
        </Stack>
                
        </ModelStack>
        </Stack>
    </Overly>,
    document.getElementById("portal-custom")
  )
}
