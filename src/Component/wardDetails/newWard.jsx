import React, { useState, useEffect } from 'react'
import { fetchPosition } from '../../Data/wardDetails/wardService'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Alert as MuiAlert,
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'

const AddNewWardForm = ({ open, handleClose }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [loggedUserPosition, setLoggedUserPosition] = useState('')

  const showSuccessAlert = () => {
    handleClose()
    Swal.fire({
      text: 'New ward successfully added!',
      icon: 'success',
      confirmButtonColor: '#243e4f',
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionData = await fetchPosition()
        setLoggedUserPosition(positionData)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [])

  const onSubmit = () => {
    return null
  }

  const initialValues = {
    wardName: '',
    wardNumber: '',
    sisterName: '',
    numberOfNursesInTheWard: '',
    morningShift: '',
    eveningShift: '',
    nightShift: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      //   validate={validate}
    >
      <Form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add ward details</DialogTitle>
          <DialogContent>
            <label>Ward Name</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="wardName"
              required
            />
            <label>Ward number</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="wardNumber"
              required
            />
            <label>Sister name</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="sisterName"
              required
            />

            <label>Total number of nurses in ward</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="numberOfNursesInTheWard"
              required
            />

            <label>Number of nurses in morning shift</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="morningShift"
              required
              select
            />

            <label>Number of nurses in evening shift</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="eveningShift"
              required
            />

            <label>Number of nurses in night shift</label>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="nightShift"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={showSuccessAlert}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Form>
    </Formik>
  )
}

export default AddNewWardForm
