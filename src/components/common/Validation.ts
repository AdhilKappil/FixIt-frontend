import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
  mobile: Yup.string()
    .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
    .required("Please enter mobile"),
  email: Yup.string().email("Please enter valid email").required("Please enter email"),
  password: Yup.string()
  .min(6, "Password must be at least 6 characters")
  .matches(/^[^\s]+$/, "Password cannot contain spaces")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter password"),
});


export const loginValidation = Yup.object({
  email: Yup.string().email("Please enter valid email").required("Please enter email"),
  password: Yup.string()
  .required("Please enter password"),
});   


export const serviceValidation = Yup.object().shape({
  serviceName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters")
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
    // firstHourCharge: Yup.number()
    // .required("Please enter First hour price")
    // .positive("Price must be positive")
    // .integer("Price must be an integer")
    // .min(100, "Minimum Price 100")
    // .max(1000, "Maximum Price 1000"),
    // laterHourCharge: Yup.number()
    // .required("Please enter Later hour price")
    // .positive("Price must be positive")
    // .integer("Price must be an integer")
    // .min(100, "Minimum Price 100")
    // .max(1000, "Maximum Price 1000"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters")
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Description cannot have adjacent spaces")
    .required("Please enter description"),
  imageFile: Yup.mixed().required("Please upload an image file"),
});