import {Button, ButtonGroup,Stack, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import Theme from '../../Component/Theme';
import ReactDOM from 'react-dom'
import { useFormik } from 'formik';
import {validationSchemaRecoveryEmail} from './Validation';
import { validationSchemaOtp } from './Validation';

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

export const BtnTypography=styled(Typography)(({theme})=>({
    fontSize:"18px",
    [theme.breakpoints.down("md")]:{
        fontSize:"14px",

    },

}))



const UserTitleBox=styled(Stack)(({theme})=>({
    marginBottom:"0.5em",
    width:"65%",
    [theme.breakpoints.down("md")]:{
        width:"65%",

    },
    textAlign:"center",

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

export default function Recovery({recoveryModel ,setRecoveryModel,resetPasswordModelOn}) {

    const [email,setEmail]=useState(true);

    const [mobile,setMobile]=useState(false);

    

    const emailHandle=()=>{
        setEmail(true);
        setMobile(false);
    }

    const mobileHandle=()=>{
        setEmail(false);
        setMobile(true);
    }




    //define initial values
    const initialValuesEmail={
        email:"",
        mobileNo:"",

    }

    //define onsubmit on send Otp
    const onSubmitEmail=(values)=>{
        console.log(values)
        resetPasswordModelOn()

    }

    //formik define send OTP
    const formik=useFormik({
        initialValues:initialValuesEmail,
        onSubmit:onSubmitEmail,
        validationSchema:validationSchemaRecoveryEmail
    })



    //Define initial values of OTP

    // const initialValuesOtp={
    //     otp:"",
    // }

    //Define onsubmit function of Recovery password
    // const onSubmitOtp=(values)=>{
    //     console.log(values)
        
        
    // }

    //Define formik of Control Recovery password 
    // const formik2=useFormik({
    //     initialValues:initialValuesOtp,
    //     onSubmit:onSubmitOtp,
    //     validationSchema:validationSchemaOtp,
    // })


  return ReactDOM.createPortal(
    <Overly>
        <Stack justifyContent="center" alignItems="center" alignContent="-moz-initial" sx={{
            
        }}>
        <ModelStack sx={{
            backgroundColor:theme.palette.background.paper,
            marginTop:"6em",
            width:500,
            height:"70vh",
            borderRadius:theme.shape.borderRadius,
            overflow:"hidden",
            overflowY:"auto",
            [theme.breakpoints.down("md")]:{
                width:400,
                height:"80vh",
            },
            }}>
            <Stack display="flex" direction="row" justifyContent='end'>
                <Button
                    variant="contained" 
                    onClick={()=>setRecoveryModel(false)}
                ><Typography sx={{fontSize:"1rem"}}>X</Typography>
                </Button>
            </Stack>

            <Stack alignItems="center" spacing={5}>
                <UserTitleBox>
                    <Typography variant="h5" sx={{
                                [theme.breakpoints.down("md")]:{
                                    fontSize:"24px"
                                },
                       }}>
                             Recovery Password
                    </Typography>
                </UserTitleBox>
                <Styledstack>
                    <Typography variant="subtitle2">Select a recovery method to proceed</Typography>
                </Styledstack>
                <Styledstack  direction="row" >
                    <ButtonGroup>
                        <Button size="small" variant={email?'contained':"outlined"} sx=
                        {{  width:100,
                            "&:hover":{
                                backgroundColor:theme.palette.secondary.main,
                            }
                        }} 
                        onClick={emailHandle}
                        >
                            <BtnTypography>Email</BtnTypography>
                        </Button>

                        <Button size="small" variant={mobile?"contained":"outlined"} sx=
                        {{  width:100,
                            "&:hover":{
                                backgroundColor:theme.palette.secondary.main,
                            }
                        }}
                        onClick={mobileHandle}
                        >
                            <BtnTypography>Mobile</BtnTypography>
                        </Button>
                    </ButtonGroup>
                </Styledstack>
                <Styledstack>
                    {email&&<Typography variant='subtitle2'>We will send a OTP code for given email address to recover account</Typography>}
                    {mobile&&<Typography variant='subtitle2'>We will send a OTP code for given mobile number to recover account</Typography>}
                </Styledstack>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={1.5} sx={{
                        width:500,
                            alignItems:"center",
                    }}>    
                    <Stack
                    sx={{ 
                        width:"80%",
                        [theme.breakpoints.down("md")]:{
                        width:"50%",
                        }
                        }}
                    >
                    {email&&<TextField id="email" name="email" variant="outlined" size='small' placeholder="Enter your email"
                                            helperText={formik.errors.email}
                                            FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                            value={formik.values.email}
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
                                            />}
                    
                    {mobile&&<TextField id="mobile-no" name="mobileNo" variant="outlined" size='small' placeholder="Enter your mobile number"
                                            helperText={formik.errors.mobileNo}
                                            FormHelperTextProps={{ style: { color:theme.palette.error.main} }}

                                            value={formik.values.mobileNo}
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
                                            />}
                    </Stack>

                    <Stack sx={{
                                            width:"80%",
                        [theme.breakpoints.down("md")]:{
                        width:"50%",
                        }
                    }}>
                        <Button 
                        variant="contained" 
                        type='submit'
                        sx=
                        {{
                            width:"100%",
                            "&:hover":{
                                backgroundColor:theme.palette.secondary.main,
                            }
                        }}
                        
                        
                        >
                            <BtnTypography>Send OTP</BtnTypography></Button>
                    </Stack>
                    </Stack>
                </form>


                
            </Stack>


                
        </ModelStack>
        </Stack>
    </Overly>,
    document.getElementById("portal-recovery")
  )
}
