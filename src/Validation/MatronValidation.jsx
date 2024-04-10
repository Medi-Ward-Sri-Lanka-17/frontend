import * as Yup from 'yup'

export const validationSchema = Yup.object({
  nic: Yup.string()
    .required('*NIC is required')
    .matches(/^[0-9Vv]+$/, '*NIC is Invalid'),
  // .minLength(10, '*NIC is Invalid')
  // .maxLength(12, '*NIC is Invalid'),

  fullName: Yup.string()
    .required('*Name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must contain only letters and spaces'),

  firstName: Yup.string()
    .required('*First Name is required')
    .matches(/^[a-zA-Z]+$/, '*First Name must contain only letters'),

  lastName: Yup.string()
    .required('*Last Name is required')
    .matches(/^[a-zA-Z]+$/, '*Last Name must contain only letters'),

  dob: Yup.date()
    .required('Date of birth is required')
    .min(new Date('1950-01-01'), '*Date of birth is Invalid'),
  serviceDate: Yup.date()
    .required('Date of birth is required')
    .min(new Date('1950-01-01'), '*Date of birth is Invalid'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  mobileNo: Yup.number()
    .required('*Mobile number is required')
    .integer('*Mobile number is  Invalid.')
    .min(10, '*Mobile number must contain at least 10 digits'),
  // .max(10, '*Mobile number must contain at most 10 digits'),
})
