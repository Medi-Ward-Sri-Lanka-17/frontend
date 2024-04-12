
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Theme from '../../Component/Theme';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom'
import { BtnTypography } from './Recovery';
import { useFormik } from 'formik';
import { validationSchemaCustonerSupport } from './Validation';
import {sendCustomerDetails} from '../../Services/CustomerSupport/SendDetails'

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
        width:"65%",
    },
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center"

}))

const TitleBox=styled(Box)(({theme})=>({
    textAlign:"center",
    width:"80%",
    [theme.breakpoints.down("md")]:{
        width:"65%",
    }
}))

export default function CustomerSup({closeCustom,responseSuccessAlert}) {

    //Define initialvalues for formik

    const initialValues={
        nic:"",
        username:"",
        email:"",
        description:"",
    }

    const [ok,setOk]=useState(null)

    const onSubmit=(values)=>{
        //console.log(values)
        sendCustomerDetails(values)
        .then(response=>{
            //console.log(response)
            if(response.status==200){
                responseSuccessAlert()
            }
        })
        .catch(error=>{console.log(error)})




        

    }

    const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:validationSchemaCustonerSupport,
    })

   return ReactDOM.createPortal(
    <Overly>
        <Stack justifyContent="center" alignItems="center" sx={{

        }}>
            <ModelStack
            sx={{
                marginTop:"4em",
                backgroundColor:theme.palette.background.paper,
                width:500,
                height:"80vh",
                borderRadius:theme.shape.borderRadius*0.5,
                overflow:"hidden",
                overflowY:"auto",
                [theme.breakpoints.down("md")]:{
                    width:400,
                    height:"80vh",
                }
                }}
            >
                <Stack display="flex" direction="row" justifyContent='end'>
                    <Button
                        variant="contained" 
                        onClick={()=>closeCustom(false)}
                    ><Typography variant='h5'>X</Typography>
                    </Button>
                </Stack>
                <form onSubmit={formik.handleSubmit}>
                    <Stack textAlign="center" alignItems="center" spacing={1} sx={{marginTop:"15px"}}>
                    
                        <TitleBox>
                            <Typography variant="h5">Customer Support</Typography>
                        </TitleBox>


                        <Stack spacing={2} textAlign="left" sx={{
                            width:"80%",
                            [theme.breakpoints.down("md")]:{
                                width:"65%",
                            },
                            }}>
                            <Typography variant='h6'>Nic No:</Typography>
                        </Stack>

                        <Styledstack>
                            <TextField id="nic" name="nic" variant="outlined" size='small' placeholder="Enter your nic"
                                                    helperText={formik.errors.nic}
                                                    FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                                    value={formik.values.nic}
                                                    onChange={formik.handleChange}
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
                                width:"65%",
                            },
                            }}>
                            <Typography variant='h6'>Username:</Typography>
                        </Stack>

                        <Styledstack>
                        <TextField id="username" name="username" variant="outlined" size='small' placeholder="Enter your username"
                                                helperText={formik.errors.username}
                                                FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
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
                                width:"65%",
                            },
                            }}>
                            <Typography variant='h6'>Email Address:</Typography>
                        </Stack>

                        <Styledstack>
                            <TextField id="emailaddress" name="email" variant="outlined" size='small' placeholder="Enter email address"
                                                    type="text"
                                                    helperText={formik.errors.email}
                                                    FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
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
                                width:"65%",
                            },
                            }}>
                            <Typography variant='h6'>Desciption:</Typography>
                        </Stack>

                        <Styledstack>
                            <TextField id="description" name="description" variant="outlined" size='small' placeholder="Type your problems here...."
                                                    type="text"
                                                    helperText={formik.errors.description}
                                                    FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
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
                                    width:"65%",
                                },
                            }}
                        >
                            <Button
                                variant="contained" 
                                type='submit'
                                sx={{
                                    width:"100%",
                                    "&:hover":{
                                        backgroundColor:theme.palette.secondary.main,
                                    }
                                    
                                }}
                            >
                                    <BtnTypography>Submit Response</BtnTypography>
                            </Button>
                        </Stack>
                    </Stack>
                </form>        
        </ModelStack>
        </Stack>
    </Overly>,
    document.getElementById("portal-custom")
  )
}
