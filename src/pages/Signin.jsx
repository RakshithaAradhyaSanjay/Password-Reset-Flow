/** @format */

import React, { useState } from "react";
import AxiosService from "../utils/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    error: {
      main: "#f44336",
    },
  },
});

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "Make Strong password"),
  });

  const handleSignin = async (values) => {
    try {
      const response = await AxiosService.post("/user/signin", values);
      console.log(response.data);
      if (response.data.message) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem(
        "userData",
        JSON.stringify(response.data.userData)
      );
      navigate("/home");
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Invalid email or password. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignin}
      >
        <Form>
          <Box
            component='div'
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                marginBottom: "20px",
              },
              "& .required": {
                color: darkTheme.palette.error.main,
              },
            }}
            noValidate
            autoComplete='off'
          >
            <h2 style={{ marginBottom: "20px" }}>Signin</h2>
            <div>
              <Field
                name='email'
                type='text'
                as={TextField}
                label='Email'
                variant='outlined'
                className='required'
              />
              <ErrorMessage name='email' component='div' className='required' />
            </div>
            <div>
              <Field
                name='password'
                type={showPassword ? "text" : "password"}
                as={TextField}
                label='Password'
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className='required'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='required'
              />
            </div>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              style={{ marginTop: "20px" }}
            >
              Signin
            </Button>
            <p style={{ marginTop: "20px" }}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </p>
            <p>
              Don't have an account? <Link to='/signup'>Signup</Link>
            </p>
          </Box>
        </Form>
      </Formik>
    </ThemeProvider>
  );
};

export default Signin;
