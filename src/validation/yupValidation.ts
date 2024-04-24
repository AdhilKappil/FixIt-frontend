import * as Yup from "yup";

// validation for user sign up
export const validationSchema = Yup.object({
  name: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
  mobile: Yup.string()
    .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
    .required("Please enter mobile"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
});

// validation for login
export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string().required("Please enter password"),
});

// validation for service
export const serviceValidation = Yup.object().shape({
  serviceName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters")
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters")
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Description cannot have adjacent spaces")
    .required("Please enter description"),
    firstHourCharge: Yup.number()
    .required("Please enter First hour price")
    .positive("First hour charge must be positive")
    .integer("First hour charge must be an integer")
    .min(100, "Minimum charge 100")
    .max(1000, "Maximum charge 1000"),
  laterHourCharge: Yup.number()
    .required("Please enter Later hour price")
    .positive("Later hour charge must be positive")
    .integer("Later hour charge must be an integer")
    .min(100, "Minimum charge 100")
    .max(1000, "Maximum charge 1000"),
  imageFile: Yup.mixed().required("Please upload an image file"),
});

// validation for worker join
export const validationWrokerJoin = Yup.object({
  name: Yup.string()
    .min(3)
    .max(30)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter name"),
  mobile: Yup.string()
    .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
    .required("Please enter mobile"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
  service: Yup.string().required("Please select service"),
  profile_img: Yup.mixed().required("Please upload your profile pic"),
  idCard_img: Yup.mixed().required("Please upload your any id card"),
  district: Yup.string().required("Please select districts"),
  experience: Yup.number()
    .required("Please enter experience")
    .positive("Minimum 1 year expirience")
    .integer("Experience must be an integer"),
});



export const fogotPasswordShema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
});


export const validationForUserUpdate = Yup.object({
  name: Yup.string()
  .min(3)
  .max(30)
  .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
  .required("Please enter name"),
mobile: Yup.string()
  .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
  .required("Please enter mobile"),
})