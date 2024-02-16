import { styled } from '@mui/system'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import Theme from '../../Component/Theme' //**** Special import*/
import { ThemeProvider } from '@mui/material'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import Recovery from './Recovery'
import Reset from './Reset'
import SuccessAlert from '../../Component/SuccessAlert'
import CustomerSup from './CustomerSup'
import { validationSchema } from './Validation'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Security/AuthContext'

const img1 = require('../../Assest/mainlogo.png')

//calling Theme function
const theme = Theme()

const DemoPaper = styled(Paper)(({ theme }) => ({
  marginTop: '1em',
  width: 900,
  height: '80vh',
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 6,
  [theme.breakpoints.down('md')]: {
    width: 600,
    height: '70vh',
  },
  [theme.breakpoints.down('sm')]: {
    width: 450,
    height: 750,
  },
}))

const UserTitleBox = styled(Stack)(({ theme }) => ({
  marginTop: '2.5em',
  marginBottom: '2.5em',
  width: 350,
  [theme.breakpoints.down('md')]: {
    width: 250,
  },
  textAlign: 'center',
}))

const UserText = styled(Stack)(({ theme }) => ({
  textAlign: 'left',
  width: 350,
  [theme.breakpoints.down('md')]: {
    width: 250,
  },
}))

const UserInputBox = styled(Stack)(({ theme }) => ({
  textAlign: 'left',
  width: 350,
  [theme.breakpoints.down('md')]: {
    width: 250,
  },
}))

const Login = () => {
  //using useNavigate hook

  const navigate = useNavigate()

  //Authentication context
  const authContext = useAuth()

  //formik initialValue

  const initialValues = {
    username: '',
    password: '',
  }

  //formik onsubmit function
  // const onSubmit = (values) => {
  //   console.log(values)
  //   navigate('/home')
  // }
  const [pwdError,setPwdError]=useState(null);

  async function onSubmit() {
    const response = await authContext.login(
      formik.values.username,
      formik.values.password
    )
    authContext.setIsAuthenticate(true)
    if (response.status === 200) {
      console.log(response.data.user.position)

      console.log(authContext.isAuthenticate)
      navigate('/home')
    } else {
      console.log('Error: login credentials are wrong')
      setPwdError("Login credentials are wrong");

    }
  }

  //formik validate function

  const [showPassword, setShowPassword] = useState(false)

  const [recoveryModel, setRecoveryModel] = useState(false)

  const [reset, setReset] = useState(false)

  const [resetPwd, setResetPwd] = useState(true)

  const [alert, setAlert] = useState(false)

  const [custom, setCustom] = useState(false)

  const [responseAlert, setResponseAlert] = useState(false)

  const resetPasswordModelOn = () => {
    setReset(true)
    setRecoveryModel(false)
  }

  const openAlertSuccess = () => {
    if (resetPwd) {
      setAlert(true)
      setReset(false)
    }
  }

  const closeCustom = () => {
    setCustom(false)
  }

  const responseSuccessAlert = () => {
    setResponseAlert(true)
    setCustom(false)
  }

  //validations
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  return (
    <ThemeProvider theme={theme}>
      <Stack
        display="flex"
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: '3%',
          marginBottom: '3%',
          backgroundColor: theme.palette.background.normal,
        }}
      >
        <DemoPaper elevation={6}>
          <Stack
            display="flex"
            direction="row"
            justifyContent="space-between"
            sx={{
              overflowY: 'auto',
              [theme.breakpoints.down('sm')]: {
                display: 'block',
                width: 450,
              },
            }}
          >
            <Box
              flex="45%"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.primary.main,
                height: '80vh',
                borderTopLeftRadius: theme.shape.borderRadius * 6,
                borderBottomLeftRadius: theme.shape.borderRadius * 6,
                [theme.breakpoints.down('md')]: {
                  height: '70vh',
                  width: 300,
                },
                [theme.breakpoints.down('sm')]: {
                  height: '15vh',
                  width: 450,
                  borderTopRightRadius: theme.shape.borderRadius * 6,
                  borderBottomLeftRadius: theme.shape.borderRadius * 0,
                },
              }}
            >
              <Box
                component="img"
                src={img1}
                alt="Image description"
                sx={{
                  width: { xs: '155px', sm: '200px', md: '300px' },

                  height: { xs: '13vh', sm: '23vh', md: '33vh' },
                }}
              />
            </Box>

            <Box
              flex="55%"
              sx={{
                height: '80vh',
                borderTopRightRadius: theme.shape.borderRadius * 6,
                borderBottomRightRadius: theme.shape.borderRadius * 6,
                backgroundColor: theme.palette.background.normal,
                borderBottomLeftRadius: { xs: theme.shape.borderRadius * 6 },
                [theme.breakpoints.down('md')]: {
                  height: '70vh',
                },
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Stack display="flex" direction="column" alignItems="center">
                  <UserTitleBox>
                    <Typography
                      sx={{
                        fontSize: '2.5rem',
                        [theme.breakpoints.down('md')]: {
                          fontSize: '2rem',
                        },
                      }}
                    >
                      Welcome!
                    </Typography>
                  </UserTitleBox>

                  <Stack display="flex" direction="column" spacing={2}>
                    <UserText>
                      <Typography
                        variant="h6"
                        sx={{
                          [theme.breakpoints.down('md')]: {
                            fontSize: '1rem',
                          },
                        }}
                      >
                        Username
                      </Typography>
                    </UserText>

                    <UserInputBox>
                      <TextField
                        id="username"
                        name="username"
                        variant="outlined"
                        placeholder="Enter your username"
                        size="small"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        helperText={formik.errors.username}
                        FormHelperTextProps={{
                          style: { color: theme.palette.error.main },
                        }}
                        sx={{
                          width: '100%',
                          borderRadius: theme.shape.borderRadius,
                          '&:hover': {
                            borderBlockColor: theme.palette.success.main,
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </UserInputBox>

                    <UserText>
                      <Typography
                        variant="h6"
                        sx={{
                          [theme.breakpoints.down('md')]: {
                            fontSize: '1rem',
                          },
                        }}
                      >
                        Password
                      </Typography>
                    </UserText>

                    <UserInputBox>
                      <TextField
                        id="pwd"
                        name="password"
                        variant="outlined"
                        size="small"
                        helperText={formik.errors.password}
                        FormHelperTextProps={{
                          style: { color: theme.palette.error.main },
                        }}
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        sx={{
                          placeholder: 'Enter your password',
                          size: 'small',
                          width: '100%',
                          borderRadius: theme.shape.borderRadius,
                          '&:hover': {
                            borderBlockColor: theme.palette.success.main,
                          },
                          [theme.breakpoints.down('md')]: {
                            fontSize: '1rem',
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    <Box marginTop="0.5em">
                      {pwdError&& <Typography sx={{color:theme.palette.error.main,
                        fontSize:"12px"
                      }}>{pwdError}</Typography>}
                    </Box>
                    </UserInputBox>
                  </Stack>

                  <Stack
                    display="flex"
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      width: 350,
                      marginTop: '20px',
                      marginBottom: '20px',
                      [theme.breakpoints.down('md')]: {
                        width: 250,
                      },
                    }}
                  >
                    <Box
                      flex="50%"
                      sx={{
                        textAlign: 'left',
                      }}
                    >
                      <Button
                        variant="text"
                        sx={{ color: theme.palette.link.main }}
                        onClick={() => setRecoveryModel(true)}
                      >
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                        >
                          Reset Password
                        </Typography>
                      </Button>

                      {recoveryModel && (
                        <Recovery
                          recoveryModel={recoveryModel}
                          setRecoveryModel={setRecoveryModel}
                          resetPasswordModelOn={resetPasswordModelOn}
                        />
                      )}
                      {reset && (
                        <Reset
                          reset={reset}
                          setReset={setReset}
                          openAlertSuccess={openAlertSuccess}
                        />
                      )}
                      {alert && <SuccessAlert setAlert={setAlert} />}
                    </Box>

                    <Box
                      flex="50%"
                      sx={{
                        textAlign: 'right',
                      }}
                    >
                      <Button
                        variant="text"
                        sx={{ color: theme.palette.link.main }}
                        onClick={() => setCustom(true)}
                      >
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                        >
                          Customer Suppprt
                        </Typography>
                      </Button>
                      {custom && (
                        <CustomerSup
                          closeCustom={closeCustom}
                          responseSuccessAlert={responseSuccessAlert}
                        />
                      )}
                      {responseAlert && (
                        <SuccessAlert setAlert={setResponseAlert} />
                      )}
                    </Box>
                  </Stack>

                  <Stack>
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: '0.5em',
                        width: 350,
                        height: 40,
                        [theme.breakpoints.down('md')]: {
                          width: 250,
                          height: 35,
                        },
                        color: 'White',
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                      type="submit"
                    >
                      <Typography variant="h6">Login</Typography>
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </DemoPaper>
      </Stack>
    </ThemeProvider>
  )
}

export default Login
