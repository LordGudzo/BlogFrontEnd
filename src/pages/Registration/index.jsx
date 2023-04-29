import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, 
    handleSubmit, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      fullName: 'Andrew Gudzo',
      email: 'test25@ukr.net',
      password: '12345'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    console.log(values)
    const data = await dispatch(fetchRegister(values));

    if(!data.payload) {
      alert("registration was not successfull")
    } else {
      alert("registration was successfull")
    }
    
    if( "token" in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to='/'/>
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className={styles.field} 
          label="fullName"
          error={Boolean(errors.fullName?.message)}
          helperText= {errors.fullName?.message}
          {... register('fullName', {required: "Enter your login"})}
          fullWidth 
        />
        <TextField 
          className={styles.field} 
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText= {errors.email?.message}
          type="email"
          {... register('email', {required: "Enter your mail"})}
          fullWidth 
        />
        <TextField 
          className={styles.field} 
          label="Password" 
          error={Boolean(errors.password?.message)}
          helperText= {errors.password?.message}
          {... register('password', {required: "Enter your password"})}
          fullWidth 
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>      
    </Paper>
  );
};
