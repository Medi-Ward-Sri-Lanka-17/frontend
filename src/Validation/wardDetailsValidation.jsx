import * as Yup from 'yup'

//Edit basic ward details validation

export const EditBasicWardDetailsValidation = Yup.object({
  wardName: Yup.string()
    .required('*Ward name is required')
    .matches(
      /^[a-zA-Z\s\-]+$/,
      '*Name must only contain letters, spaces, and hyphens'
    ),

  wardNumber: Yup.number()
    .required('*Ward number is required')
    .positive('*Ward number must be a positive integer')
    .integer('*Ward number must be an integer'),

  matron: Yup.string()
    .required('*NIC is required')
    .matches(/^[0-9Vv]+$/, '*NIC is Invalid'),

  numberOfNurses: Yup.number()
    .required('*Total number of nurses is required')
    .positive('*Number of nurses must be a positive integer')
    .integer('*Number of nurses must be an integer')
    .max(53, '*Number of nurses must be less than 54')
    .min(1, '*Number of nurses must be greater than 0'),

  morningShift: Yup.number()
    .required('*Number of morning shift nurses is required')
    .positive('*Number of morning shift nurses must be a positive integer')
    .integer('*Number of morning shift nurses must be an integer')
    .min(1, '*Number of nurses in the morning shift must be greater than 0'),

  eveningShift: Yup.number()
    .required('*Number of evening shift nurses is required')
    .positive('*Number of evening shift nurses must be a positive integer')
    .integer('*Number of evening shift nurses must be an integer')
    .min(1, '*Number of nurses in the evening shift must be greater than 0'),

  nightShift: Yup.number()
    .required('*Number of night shift nurses is required')
    .positive('*Number of night shift nurses must be a positive integer')
    .integer('*Number of night shift nurses must be an integer')
    .min(1, '*Number of nurses in the night shift must be greater than 0'),
})

//add a staff member and edit nurse details validation

export const addNurseValidation = Yup.object().shape({
  firstName: Yup.string()
    .required('*First name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must only contain letters and spaces'),

  lastName: Yup.string()
    .required('*Last name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must only contain letters and spaces'),

  fullName: Yup.string()
    .required('*Full name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must only contain letters and spaces'),

  serviceId: Yup.string()
    .required('*Service ID is required')
    .matches(
      /^(?:[0-9]{9}V|[0-9]{12})$/,
      "ID must have 9 numeric digits followed by the letter 'V' or exactly 12 numeric digits"
    ),

  birthdate: Yup.date()
    .required('*Birthdate is required')
    .typeError('*Invalid date type'),

  email: Yup.string()
    .required('*Email is required')
    .email('*Invalid email address'),

  position: Yup.string().required('*Position is required'),

  wardNo: Yup.number()
    .required('*Ward number is required')
    .positive('*Ward number must be a positive integer')
    .integer('*Ward number must be an integer'),

  leaveNo: Yup.number()
    .required('*Leave number is required')
    .positive('*Leave number must be a positive integer')
    .integer('*Leave number must be an integer'),

  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, '*Invalid phone number')
    .required('*Phone number is required'),

  // serviceStartDate: Yup.date().when('birthdate', (birthdate, schema) => {
  //   const twentyYearsAfterBirth = new Date(birthdate)
  //   twentyYearsAfterBirth.setFullYear(twentyYearsAfterBirth.getFullYear() + 20)

  //   return schema
  //     .required('*Service start date is required')
  //     .typeError('*Invalid date type')
  //     .min(
  //       twentyYearsAfterBirth,
  //       'Service start date must be greater than 20 years from birthdate'
  //     )
  // }),

  remainingVacationLeaves: Yup.number()
    .required('*Remaining vacation leaves are required')
    .positive('*Remaining vacation leaves must be a positive integer')
    .integer('*Remaining vacation leaves must be an integer')
    .max(23, '*Remaining casual leaves must be less than 24'),

  remainingCasualLeaves: Yup.number()
    .required('*Remaining casual leaves are required')
    .positive('*Remaining casual leaves must be a positive integer')
    .integer('*Remaining casual leaves must be an integer')
    .max(23, '*Remaining casual leaves must be less than 24'),
})

//Add new sister validation

export const addSisterValidation = Yup.object().shape({
  firstName: Yup.string()
    .required('*First name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must only contain letters and spaces'),

  lastName: Yup.string()
    .required('*Last name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must only contain letters and spaces'),

  fullName: Yup.string()
    .required('*Full name is required')
    .matches(/^[a-zA-Z\s]+$/, '*Name must only contain letters and spaces'),

  serviceId: Yup.string()
    .required('*Service ID is required')
    .matches(
      /^(?:[0-9]{9}V|[0-9]{12})$/,
      "ID must have 9 numeric digits followed by the letter 'V' or exactly 12 numeric digits"
    ),

  birthdate: Yup.date()
    .required('*Birthdate is required')
    .typeError('*Invalid date type'),

  email: Yup.string()
    .required('*Email is required')
    .email('*Invalid email address'),

  position: Yup.string().required('*Position is required'),

  leaveNo: Yup.number()
    .required('*Leave number is required')
    .positive('*Leave number must be a positive integer')
    .integer('*Leave number must be an integer'),

  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, '*Invalid phone number')
    .required('*Phone number is required'),

  serviceStartDate: Yup.date().when('birthdate', (birthdate, schema) => {
    const twentyYearsAfterBirth = new Date(birthdate)
    twentyYearsAfterBirth.setFullYear(twentyYearsAfterBirth.getFullYear() + 20)

    return schema
      .required('*Service start date is required')
      .typeError('*Invalid date type')
      .min(
        twentyYearsAfterBirth,
        'Service start date must be greater than 20 years from birthdate'
      )
  }),
})
