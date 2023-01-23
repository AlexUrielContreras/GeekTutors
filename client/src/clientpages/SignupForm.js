import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth'


function SignupForm() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, {error}] = useMutation(ADD_USER);
  

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
      const {data} = await addUser({
        variables : {...userFormData}
        
      })
      Auth.login(data.createUser.token)
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='signup-form'>

        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='my-3'>
          <Form.Label htmlFor='firstName' className='form-label semi-bold-text'>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your First Name'
            name='firstName'
            onChange={handleInputChange}
            value={userFormData.firstName}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='my-3'>
          <Form.Label htmlFor='lastName' className='form-label semi-bold-text'>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Last Name'
            name='lastName'
            onChange={handleInputChange}
            value={userFormData.lastName}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='my-3'>
          <Form.Label htmlFor='email' className='form-label semi-bold-text'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label htmlFor='password' className='form-label semi-bold-text'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
      
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

export default SignupForm;