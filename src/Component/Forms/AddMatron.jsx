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
} from '@mui/material'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
//import "react-toastify/dist/ReactToastify.css";
import { addNurseValidation } from '../../Validation/validation'
import { validationSchema } from '../../Validation/MatronValidation'
//import "./style.css";

const AddMatron = ({ open, handleClose }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [])

  const initialValues = {
    nic: '',
    fullName: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    mobile: '',
  }

  const showSuccessAlert = () => {
    handleClose()
    Swal.fire({
      text: 'Staff member successfully added!',
      icon: 'success',
      confirmButtonColor: '#243e4f',
    })
  }

  const handleSubmit = async (values, actions) => {
    formikAddMatron.submitForm()
    console.log(formikAddMatron.errors)
    showSuccessAlert()
  }

  const formikAddMatron = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form autoComplete="off">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Matron</DialogTitle>
        <DialogContent>
          <label>NIC</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="nic"
            value={formikAddMatron.values.nic}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={
              formikAddMatron.touched.nic && Boolean(formikAddMatron.errors.nic)
            }
            helperText={
              formikAddMatron.touched.nic && formikAddMatron.errors.nic
            }
          />

          <label>Full Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="fullName"
            value={formikAddMatron.values.fullName}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={
              formikAddMatron.touched.fullName &&
              Boolean(formikAddMatron.errors.fullName)
            }
            helperText={
              formikAddMatron.touched.fullName &&
              formikAddMatron.errors.fullName
            }
          />

          <label>First Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="firstname"
            value={formikAddMatron.values.firstName}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={
              formikAddMatron.touched.firstName &&
              Boolean(formikAddMatron.errors.firstName)
            }
            helperText={
              formikAddMatron.touched.firstName &&
              formikAddMatron.errors.firstName
            }
          />

          <label>Last Name</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            value={formikAddMatron.values.lastName}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={
              formikAddMatron.touched.lastName &&
              Boolean(formikAddMatron.errors.lastName)
            }
            helperText={
              formikAddMatron.touched.lastName &&
              formikAddMatron.errors.lastName
            }
          />

          <label>Birthday</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="date"
            name="dob"
            value={formikAddMatron.values.dob}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={Boolean(formikAddMatron.errors.dob)}
            helperText={
              formikAddMatron.touched.dob && formikAddMatron.errors.dob
            }
          />

          <label>Email</label>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            fullWidth
            name="email"
            value={formikAddMatron.values.email}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={
              formikAddMatron.touched.email &&
              Boolean(formikAddMatron.errors.email)
            }
            helperText={
              formikAddMatron.touched.email && formikAddMatron.errors.email
            }
          />

          <label>Mobile No</label>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="mobile"
            value={formikAddMatron.values.mobile}
            required
            onChange={formikAddMatron.handleChange}
            onBlur={formikAddMatron.handleBlur}
            error={
              formikAddMatron.touched.mobile &&
              Boolean(formikAddMatron.errors.mobile)
            }
            helperText={
              formikAddMatron.touched.mobile && formikAddMatron.errors.mobile
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={formikAddMatron.onSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default AddMatron
