/* import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("*Full name is required"),
  userName: Yup.string().required("*User name is required"),
  email: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "*Mobile number must be 10 digits")
    .min(10, "*Mobile number must be at least 10 digits")
    .max(10, "*Mobile number must not exceed 10 digits")
    .required("*Mobile number is required"),
  address: Yup.string().required("*Address is required"),
});

export default validationSchema;
 */

/* import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("*Full name is required"),
  userName: Yup.string().required("*User name is required"),
  email: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "*Mobile number must be 10 digits")
    .min(10, "*Mobile number must be at least 10 digits")
    .max(10, "*Mobile number must not exceed 10 digits")
    .required("*Mobile number is required"),
  address: Yup.string().required("*Address is required"),
  currentPassword: Yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string().required("*Current password is required"),
    otherwise: Yup.string(),
  }), */
/* newPassword: Yup.string().when("currentPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string()
      .required("*New password is required")
      .min(8, "*Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    otherwise: Yup.string(),
  }),
  confirmNewPassword: Yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string()
      .required("*Confirm new password is required")
      .oneOf([Yup.ref("newPassword")], "*Passwords must match"),
    otherwise: Yup.string(),
  }), */
/* });

export default validationSchema; */

// Validation.jsx

/* import * as Yup from "yup";

const userValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("*Full name is required"),
  userName: Yup.string().required("*User name is required"),
  email: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "*Mobile number must be 10 digits")
    .min(10, "*Mobile number must be at least 10 digits")
    .max(10, "*Mobile number must not exceed 10 digits")
    .required("*Mobile number is required"),
  address: Yup.string().required("*Address is required"),
});

const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string().required("*Current password is required"),
    otherwise: Yup.string(),
  }),
  newPassword: Yup.string().when("currentPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string()
      .required("*New password is required")
      .min(8, "*Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    otherwise: Yup.string(),
  }),
  confirmNewPassword: Yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string()
      .required("*Confirm new password is required")
      .oneOf([Yup.ref("newPassword")], "*Passwords must match"),
    otherwise: Yup.string(),
  }),
});

const validationSchema = Yup.object().shape({
  ...userValidationSchema.fields,
  ...passwordValidationSchema.fields,
});

export default validationSchema; */

// validation.jsx

import * as Yup from "yup";

const profileDetailsValidation = {
  fullName: Yup.string().required("*Full name is required"),
  userName: Yup.string().required("*User name is required"),
  email: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "*Mobile number must be 10 digits")
    .required("*Mobile number is required"),
  address: Yup.string().required("*Address is required"),
};

const passwordValidation = {
  currentPassword: Yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string().required("*Current password is required"),
    otherwise: Yup.string(),
  }),
  newPassword: Yup.string().when("currentPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string()
      .required("*New password is required")
      .min(8, "*Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "*Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    otherwise: Yup.string(),
  }),
  confirmNewPassword: Yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: Yup.string()
      .required("*Confirm new password is required")
      .oneOf([Yup.ref("newPassword")], "*Passwords must match"),
    otherwise: Yup.string(),
  }),
};

export { profileDetailsValidation, passwordValidation };
