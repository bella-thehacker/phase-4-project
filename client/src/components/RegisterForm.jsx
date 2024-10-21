import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
});

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        // API call to register a new user
        fetch('http://127.0.0.1:8040/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Registered:', data);
          setSubmitting(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>

         <div>
            <label>First Name</label>
            <Field name="first_name" type="text" />
            {errors.first_name && touched.first_name ? <div>{errors.first_name}</div> : null}
          </div>

          <div>
            <label>Last Name</label>
            <Field name="last_name" type="text" />
            {errors.last_name && touched.last_name ? <div>{errors.last_name}</div> : null}
          </div>

          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>

          <div>
            <label>Username</label>
            <Field name="username" type="text" />
            {errors.username && touched.username ? <div>{errors.username}</div> : null}
          </div>

          <div>
            <label>Password</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
