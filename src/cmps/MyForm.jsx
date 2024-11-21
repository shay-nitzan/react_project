// import React from 'react';
import * as React from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './MyForm.css'
// import Submit from './Submit.jsx'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export function MyForm() {
    return (
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className='formik'>
              <div className="field-wrapper">
                <Field
                  name="firstName" 
                  placeholder="Enter your first name" 
                />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
              </div>

              <div className="field-wrapper">
                <Field 
                  name="lastName" 
                  placeholder="Enter your last name" 
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
              </div>

              <div className="field-wrapper">
                <Field 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className="field-wrapper">
                <Field name="color:" placeholder="choose color:" as="select">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </Field>
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
              </div>

              <button type="submit">Submit</button>
              <Submit/>
            </Form>
          )}
        </Formik>
      </div>
    );
}

export default MyForm;