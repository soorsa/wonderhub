import * as yup from "yup";

export const signInSchema = yup.object({
  username: yup.string().required("Username is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
export const signUpSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  // ),

  // confirm_password: yup
  //   .string()
  //   .required("Please confirm your password")
  //   .oneOf([yup.ref("password")], "Passwords must match"),
  agree: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("required"),
  role: yup
    .string()
    .oneOf(["employer", "job_seeker"], "Invalid role selected")
    .required("Role is required"),
});
