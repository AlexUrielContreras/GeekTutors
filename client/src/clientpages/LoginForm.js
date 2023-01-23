// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(false);
  const [validated, setValidated] = useState(false);

  const [ logIn , {error}] = useMutation(LOGIN)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true)
    
    try {
      const {data} = await logIn({
        variables: {...userFormData}
      })

      Auth.login(data.login.token);

    } catch (e) {
      setErrorMessage(true)
      console.log(e);
    }

  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='login-form'>

        <Form.Group className='my-3'>
          <Form.Label htmlFor='email' className='form-label semi-bold-text'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password' className='form-label semi-bold-text'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            onFocus={() => {
              setErrorMessage(false)
              setValidated(false)
            }}
            required
          />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        {error && errorMessage && <div className='login-error semi-bold-text'>Incorrect Credentials</div>}
        <Button
         className='mt-3'
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>

    </>
  );
};

export default LoginForm;
