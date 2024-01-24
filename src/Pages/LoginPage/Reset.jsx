import { Box, Button, IconButton, InputAdornment, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Theme from '../../Component/Theme';
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validateNewPassword } from './Validation';
import { BtnTypography } from './Recovery';

import ReactDOM from 'react-dom'

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
    zIndex:2000,

}))




const TitleBox=styled(Box)(({theme})=>({
    marginBottom:"30px",
    textAlign:"center",
    width:350,
    [theme.breakpoints.down("md")]:{
        width:"80%%",
    }
}))

const UserText=styled(Stack)(({theme})=>({
    textAlign:"left",
    width:350,
    [theme.breakpoints.down("md")]:{
        width:"100%",
        
    }
}))

const UserInputBox=styled(Stack)(({theme})=>({
    textAlign:"left",
    width:350,
    [theme.breakpoints.down("md")]:{
        width:"100%",
    }
}))

export default function Reset({reset,setReset,openAlertSuccess}) {

    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setConfirmShowPassword]=useState(false);

    //validate
    const initialValue={newpassword:"",confirmpassword:""}
    const [formValues,setFormValues]=useState(initialValue);
    const [frormError,setFormError]=useState({});
    const [isSubmit,setIsSubmit]=useState(false);

    const handleNewPassword=(e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value});
    }

    const resetPwdHandle=(e)=>{
        setFormError(validateNewPassword(formValues));
        setIsSubmit(true);

        if(validateNewPassword(formValues)==null){
            openAlertSuccess();
        }
        
    }

    useEffect(()=>{
        if(Object.keys(formValues)===0&&isSubmit){ 
            console.log(formValues)
            
        }
    })


  return ReactDOM.createPortal(
    <Overly>
        <Stack alignItems="center" justifyContent="center">
        <ModelStack sx={{
            backgroundColor:theme.palette.background.paper,
            marginTop:"7em",
            marginBottom:"4em",
            width:500,
            height:"70vh",
            borderRadius:theme.shape.borderRadius,
            overflow:"hidden",
            overflowY:"auto",
            [theme.breakpoints.down("md")]:{
                width:400,
                height:"70vh",
            }
            }}
        >
            <Stack display="flex" direction="row" justifyContent='end'>
                    <Button size="small"
                        variant="contained" 
                        onClick={()=>setReset(false)}
                    ><Typography variant='h6'>X</Typography>
                    </Button>
            </Stack>
            <Stack display="flex" direction="column" alignItems="center">
                <TitleBox>
                    <Typography variant="h5" sx={{
                                [theme.breakpoints.down("md")]:{
                                    fontSize:"24px"
                                },
                       }}>
                            Reset Password 
                    </Typography>
                </TitleBox>

                <UserText>
                    <Typography variant="subtitle2">Password must be:</Typography>
                </UserText>

                <Stack sx={{marginBottom:"20px"}}>
                    <ul>
                        <li><Typography variant="subtitle2">Be at least 8 characters long</Typography></li>
                    <li> <Typography variant="subtitle2">Contain at least one uppercase</Typography></li>
                        <li><Typography variant="subtitle2">Contain at least one lowercase</Typography></li>
                        <li><Typography variant="subtitle2">Contain at least one number</Typography></li>
                        <li><Typography variant="subtitle2">Contain at least one special characters</Typography></li>
                    </ul>
                </Stack>
                <Stack display="flex" direction="column" spacing={1.5}>
                                    <UserText>
                                        <Typography variant='h6'>Enter New Password</Typography>
                                    </UserText>

                                    <UserInputBox>

                                        <TextField id="newpwd" name="newpassword" variant="outlined" size='small'
                                            helperText={frormError.newpassword}
                                            FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                            value={formValues.newpassword}
                                            onChange={handleNewPassword}
                                            type={showPassword? "text":"password"}
                                            sx={{
                                                placeholder:"Enter your password",
                                                size:"small",
                                                width:"100%",
                                                borderRadius:theme.shape.borderRadius,
                                                "&:hover":{
                                                    borderBlockColor:theme.palette.success.main
                                                }
                                                }}
                                            InputProps={{

                                                    endAdornment: (
                                                
                                                    <InputAdornment position="end">
                                                
                                                        <IconButton
                                                
                                                        edge="end"
                                                
                                                        onClick={()=>setShowPassword(true)}

                                                        onBlur={()=>setShowPassword(false)}
                                                
                                                        >
                                                
                                                        {showPassword ? <Visibility /> : <VisibilityOff/>}
                                                
                                                        </IconButton>
                                                
                                                    </InputAdornment>
                                                
                                                    ),
                                                
                                            }}
                                        />
                                    </UserInputBox>

                                    <UserText>
                                        <Typography variant='h6'>Confirm New Password</Typography>
                                    </UserText>

                                    <UserInputBox>

                                        <TextField id="confirmpwd" name="confirmpassword" variant="outlined" size='small'
                                        helperText={frormError.confirmpassword}
                                        FormHelperTextProps={{ style: { color:theme.palette.error.main} }}
                                        value={formValues.confirmpassword}
                                        onChange={handleNewPassword}
                                        type={showConfirmPassword? "text":"password"}
                                        sx={{
                                            placeholder:"Confirm your password",
                                            size:'small',
                                            width:"100%",
                                            borderRadius:theme.shape.borderRadius,
                                            "&:hover":{
                                                borderBlockColor:theme.palette.success.main
                                            }
                                            }}
                                        InputProps={{

                                                endAdornment: (
                                            
                                                <InputAdornment position="end">
                                            
                                                    <IconButton
                                            
                                                    edge="end"
                                            
                                                    onClick={()=>setConfirmShowPassword(true)}

                                                    onBlur={()=>setConfirmShowPassword(false)}
                                            
                                                    >
                                            
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff/>}
                                            
                                                    </IconButton>
                                            
                                                </InputAdornment>
                                            
                                                ),
                                            
                                        }}
                                        />
                                    </UserInputBox>
    
                                </Stack>

            <Stack justifyContent="center" alignItems="center" sx={{
                marginTop:"3%",
                width:350,
                [theme.breakpoints.down("md")]:{
                    width:250,
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
                    onClick={()=>resetPwdHandle()}
                >
                        <BtnTypography>Reset Password</BtnTypography>
                </Button>
            </Stack>
            </Stack>
            
        </ModelStack>
        </Stack>
    </Overly>,
    document.getElementById("portal-reset")
  )
}
