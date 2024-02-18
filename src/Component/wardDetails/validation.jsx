import * as Yup from "yup";

const validationSchema = Yup.object({
  wardName: Yup.string()
    .required("Ward name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),

  wardNumber: Yup.number()
    .required("Ward number is required")
    .positive("Ward number must be a positive integer")
    .integer("Ward number must be an integer"),

  sisterName: Yup.string()
    .required("Sister name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),

  numberOfNurses: Yup.number()
    .required("Total number of nurses is required")
    .positive("Number of nurses must be a positive integer")
    .integer("Number of nurses must be an integer")
    .max(53, "Number of nurses must be less than 54")
    .min(1, "Number of nurses must be greater than 0"),

  morningShift: Yup.number()
    .required("Number of morning shift nurses is required")
    .positive("Number of morning shift nurses must be a positive integer")
    .integer("Number of morning shift nurses must be an integer")
    .min(1, "Number of nurses in the morning shift must be greater than 0"),

  eveningShift: Yup.number()
    .required("Number of evening shift nurses is required")
    .positive("Number of evening shift nurses must be a positive integer")
    .integer("Number of evening shift nurses must be an integer")
    .min(1, "Number of nurses in the evening shift must be greater than 0"),

  nightShift: Yup.number()
    .required("Number of night shift nurses is required")
    .positive("Number of night shift nurses must be a positive integer")
    .integer("Number of night shift nurses must be an integer")
    .min(1, "Number of nurses in the night shift must be greater than 0"),
});

export default validationSchema;
