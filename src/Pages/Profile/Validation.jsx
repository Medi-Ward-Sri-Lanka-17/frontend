import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  userName: Yup.string().required("User name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required"),
});

export default validationSchema;
