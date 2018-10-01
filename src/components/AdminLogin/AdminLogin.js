import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import for showing toast message

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Yup = require('yup');

// Validation Schema

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password Required!'),
  operatorID: Yup.string().required('Operator ID Required!')
});

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };
  }
  error = msg => toast.error('' + msg);

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <Formik
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              axios
                .post('/user/login', {
                  operatorID: values.operatorID,
                  password: values.password
                })
                .then(response => {
                  console.log(response.status);
                  console.log(response);
                  actions.setSubmitting(false);
                  if (response.status === 200) {
                    // update App.js state

                    console.log('login response: ', response.data);

                    if (response.data.message) {
                      this.error(response.data.message);
                      actions.setSubmitting(false);
                      return;
                    }
                    this.props.updateUser({
                      isLoggedIn: true,
                      operatorName: response.data.operatorName,
                      operatorType: response.data.operatorType
                    });

                    this.setState({
                      redirectTo: '/'
                    });
                  }
                })
                .catch(error => {
                  console.log('login error: ');
                  console.log(error);
                  actions.setSubmitting(false);
                });
            }}
            initialValues={{
              operatorID: '',
              password: ''
            }}
            render={({ errors, touched, isSubmitting, dirty, values }) => {
              return (
                <div class="container py-5">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="text-center text-white mb-4">Login</h2>
                      <div class="row">
                        <div class="col-md-6 mx-auto">
                          <div class="card rounded-0">
                            <div class="card-header">
                              <h3 class="mb-0">Login</h3>
                            </div>

                            <div class="card-body">
                              <Form>
                                <div className="form-group">
                                  <label htmlFor="operatorID">User ID </label>
                                  <Field
                                    type="text"
                                    name="operatorID"
                                    placeholder="User ID"
                                    className={
                                      errors.operatorID && touched.operatorID
                                        ? 'form-control form-control-lg rounded-0 error'
                                        : 'form-control form-control-lg rounded-0'
                                    }
                                  />
                                  {touched.operatorID &&
                                    errors.operatorID && (
                                      <div>{errors.operatorID}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                  <label htmlFor="password">Password</label>
                                  <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className={
                                      errors.password && touched.password
                                        ? 'form-control form-control-lg rounded-0 error'
                                        : 'form-control form-control-lg rounded-0'
                                    }
                                  />
                                  {touched.password &&
                                    errors.password && (
                                      <div>{errors.password}</div>
                                    )}
                                </div>

                                <button
                                  type="submit"
                                  disabled={!dirty || isSubmitting}
                                  className="btn btn-success btn-lg float-right"
                                >
                                  Login
                                </button>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </div>
      );
    }
  }
}

export default AdminLogin;
