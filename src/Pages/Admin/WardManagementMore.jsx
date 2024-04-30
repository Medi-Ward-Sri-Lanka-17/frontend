import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import SideBar from '../../Component/SideBar'
import Header from '../../Component/Header'
import Theme from '../../Component/Theme'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultButton from '../../Component/Button/DefaultButton'
import {
  getCasualtyDaysForWard,
  retrieveWardDetailsMore,
  updateWardDetailsMore,
} from '../../Services/WardDetails/WardDetailsServices'
import { getAllMatron } from '../../Services/Admin/AdminMatronServices'

const WardManagementMore = () => {
  //..................................Profile Picture...........................................................

  const authContext = useAuth()
  const proImgUrl = authContext.proPicUrl

  //............................................................................................................

  const theme = Theme()
  const { wardNo } = useParams()
  const navigate = useNavigate()

  const [editMatron, setEditMatron] = useState(false)
  const [matrons, setMatrons] = useState([])

  // Initialize state
  const [wardDetails, setWardDetails] = useState({
    wardName: '',
    matronName: '',
    matronNic: '',
    numberOfNurses: '',
    morningShiftNurses: '',
    eveningShiftNurses: '',
    nightShiftNurses: '',
  })

  const [casualtyDays, setCasualtyDays] = useState({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  })

  const handleCasualtyDayChange = (event) => {
    const { name, checked } = event.target
    setCasualtyDays((prevDays) => ({
      ...prevDays,
      [name]: checked,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'matronNic') {
      const selectedMatron = matrons.find((matron) => matron.nic === value)
      if (selectedMatron) {
        setWardDetails((prevState) => ({
          ...prevState,
          matronNic: value,
          matronName: selectedMatron.name,
        }))
      }
    } else {
      setWardDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleUpdateWard = async () => {
    await updateWardDetailsMore(wardNo, wardDetails)
  }

  const onClickMatronNic = async () => {
    setEditMatron(true)
    await getAllMatron().then((respone) => {
      setMatrons(respone.data)
      console.log(respone.data)
    })
  }

  const handleBackButton = () => {
    navigate('/previous-route') // Add your desired route for navigation
  }

  useEffect(() => {
    const fetchWardDetails = async (wardNo) => {
      const response = await retrieveWardDetailsMore(wardNo)
      console.log(response)
      if (response != null) {
        setWardDetails(response)
      }
    }

    const fetchCasuatudays = async (wardNo) => {
      const response = await getCasualtyDaysForWard(wardNo)
      if (response != null) {
        setCasualtyDays(response)
      }
    }

    fetchWardDetails(wardNo)
    fetchCasuatudays(wardNo)
  }, [wardNo])
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box className="PageContent" sx={{ width: '100%', overflowX: 'auto' }}>
          <Header title="Admin - Ward Management" proImgUrl={proImgUrl} />
          <Grid
            container
            spacing={2}
            sx={{ width: '90%' }}
            style={{ margin: '20px' }}
          >
            <Grid item xs={12}>
              <DefaultButton
                title="Back"
                width="100px"
                height="35px"
                onClick={handleBackButton}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                sx={{ color: theme.palette.primary.main }}
              >
                Update Ward Details
              </Typography>
            </Grid>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                }}
              >
                <TextField
                  label="Ward Number"
                  fullWidth
                  name="wardNo"
                  value={wardNo}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
                {editMatron ? (
                  <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <InputLabel id="matron-nic-label">Matron NIC</InputLabel>
                    <Select
                      labelId="matron-nic-label"
                      id="matron-nic-select"
                      value={wardDetails.matronNic}
                      label="Matron NIC"
                      onChange={handleInputChange}
                      name="matronNic"
                    >
                      {matrons.map((matron, index) => (
                        <MenuItem key={index} value={matron.nic}>
                          {matron.nic}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label="Matron NIC"
                    fullWidth
                    name="matronNic"
                    value={wardDetails.matronNic}
                    onChange={handleInputChange}
                    onClick={onClickMatronNic}
                    sx={{ marginBottom: '15px' }}
                  />
                )}
                <TextField
                  label="Number of Nurses (Ward)"
                  fullWidth
                  name="numberOfNurses"
                  value={wardDetails.numberOfNurses}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  label="Number of Nurses (Evening Shift)"
                  fullWidth
                  name="eveningShiftNurses"
                  value={wardDetails.eveningShiftNurses}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
              </Box>
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                }}
              >
                <TextField
                  label="Ward Name"
                  fullWidth
                  name="wardName"
                  value={wardDetails.wardName}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  label="Matron Name"
                  fullWidth
                  name="matronName"
                  value={wardDetails.matronName}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  label="Number of Nurses (Morning Shift)"
                  fullWidth
                  name="morningShiftNurses"
                  value={wardDetails.morningShiftNurses}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  label="Number of Nurses (Night Shift)"
                  fullWidth
                  name="nightShiftNurses"
                  value={wardDetails.nightShiftNurses}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '15px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <DefaultButton
                title={'Update Ward Details'}
                height="40px"
                onClick={handleUpdateWard}
              />
            </Grid>
            {/* Casualty Days */}
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                  sx={{ color: theme.palette.primary.main }}
                >
                  Casualty Days
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                  {Object.entries(casualtyDays).map(([day, isChecked]) => (
                    <Grid item xs={4} key={day}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={handleCasualtyDayChange}
                            name={day}
                          />
                        }
                        label={day.charAt(0).toUpperCase() + day.slice(1)}
                        sx={{ marginTop: '5px' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default WardManagementMore
