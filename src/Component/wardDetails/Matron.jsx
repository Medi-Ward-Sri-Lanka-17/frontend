// Matron.jsx
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem, Paper} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NursesTable from './table';
import AddIcon from '@mui/icons-material/Add';
import { fetchWardData, fetchAllWards, fetchWardData_matron, fetchPosition } from '../../Pages/WardDetails/wardService';


export default function Matron() {
  const [wardName, setWardName] = useState('');
  const [wardNumber, setWardNumber] = useState('');
  const [sisterName, setSisterName] = useState('');
  const [numberOfNurses, setNumberOfNurses] = useState('');
  const [position, setPosition] = useState();
  const [wards, setWard] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allWards = await fetchAllWards();
        const positionData = await fetchPosition();
        setWard(allWards);
        setPosition(positionData);

        // Reset values when position is 'matron'
        if (positionData === 'matron') {
          setWardName('');
          setWardNumber('');
          setSisterName('');
          setNumberOfNurses('');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  //for nurses and sisters
    useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWardData();
        console.log(data); // Log the data
        setWardName(data.wardName);
        setWardNumber(data.wardNumber);
        setSisterName(data.sisterName);
        setNumberOfNurses(data.numberOfNurses);
      } catch (error) {
        console.error('Error fetching ward data:', error.message);
      }
    };

    fetchData();
  }, []);

  
  //for matrons
  const handleWardChange = async (selectedWard) => {
    try {
      const data = await fetchWardData_matron(selectedWard);
      setWardName(data.wardName);
      setWardNumber(data.wardNumber);
      setSisterName(data.sisterName);
      setNumberOfNurses(data.numberOfNurses);
    } catch (error) {
      console.error('Error fetching ward data:', error.message);
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16, margin: 30 }}>
          <form>
          {position && position === 'matron' && wards && ( // Check if wards is defined
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    label="Select the ward"
                    name="ward"
                    select
                    onChange={(e) => {
                      setSelectedWard(e.target.value);
                      handleWardChange(e.target.value);
                    }}
                  >
                    {wards.map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="outlined"
                    size="medium"
                    style={{ margin: '20px' }}
                    startIcon={<EditIcon />}
                  >
                    Edit basic ward details
                  </Button>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Ward name"
                  name="wardName"
                  value={wardName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Ward number"
                  name="wardNumber"
                  value={wardNumber}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  label="Sister name"
                  name="sisterName"
                  value={sisterName}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ marginLeft: '10px' }}
                        // Add your onClick logic for the "More" button
                      >
                        More
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  label="Number of nurses in the ward"
                  name="numberOfNurses"
                  value={numberOfNurses}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              size="medium"
              style={{ margin: '20px' }}
              startIcon={<AddIcon />}
            >
              Add staff member
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 16, margin: 10 }}>
          <NursesTable />
        </Paper>
      </Grid>
    </Grid>
  );
}
