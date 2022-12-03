/* eslint-disable react/jsx-key */
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import createClass from 'create-react-class';
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Block } from '@mui/icons-material';
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from 'src/components/Image/logo.png';

const Hero: React.FunctionComponent<{}> = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invaild email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(/[A-Z]/, "Must contain one Uppercase")
        .matches(/([a-z])/, "Must contain one Lowercase")
        .matches(/(\d)/, "Must contain one Special character")
        .matches(/(\W)/, "Must contain one Number")
        .min(8, "Must be 8 characters"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert("submitted successfully");
    },
  });

  return (
    <div className="box">
      <form className="form" onSubmit={formik.handleSubmit}>
        <p>Login</p>

        <div className="emailbox">
          <label htmlFor="email" className="label">
            Email:
          </label>{" "}

          <input
            name='email'
            type="email"
            id="email"
            className="input"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="required">{formik.errors.email}</div>
        </div>

        <div className="item">
          <label htmlFor="password" className="label">
            Password:
          </label>

          <input
            name='password'
            type="password"
            id="password"
            className="input"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div className="required">{formik.errors.password}</div>
        </div>
        <Link to="/dashboards/dashboard" className="link">
        <input type="submit" value='Login' className="submit">
        </input>
        </Link>
      </form>
    </div>
  );
};

export default Hero;

