import { Visibility } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";

const Login = () => {
  //To show and password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      const firstName = res?.data?.userDetails?.firstName;
      const accessToken = res?.data?.accessToken;

      localStorage.setItem("firstName", firstName);
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  if (isPending) return <CircularProgress />;

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Must be a valid email.")
            .lowercase()
            .max(55, "Email must be at max 55 characters.")
            .required("Email is required.")
            .trim(),
          password: Yup.string().trim().required("Password is required."),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1rem",
              minWidth: "400px",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Typography variant="h5">Sign in</Typography>

            <FormControl fullWidth>
              <TextField label="Email" {...formik.getFieldProps("email")} />

              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...formik.getFieldProps("password")}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />

              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            <Stack sx={{ width: "100%", gap: "15px", alignItems: "center" }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                Log in
              </Button>

              <Link to={"/register"}>New User? SignUp</Link>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
