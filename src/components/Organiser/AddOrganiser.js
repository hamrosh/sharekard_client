import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_ORGANISER } from "./gql";
import { Formik, Form, Field } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Yup = require("yup");

// Validation Schema

const validationSchema = Yup.object().shape({
  organiserName: Yup.string().required("Required!")
});

class AddOrganiser extends Component {
  notify = msg => toast.success(msg);
  render() {
    return (
      <React.Fragment>
        <Mutation
          mutation={ADD_ORGANISER}
          onError={e => {
            console.log(e);
          }}
          onCompleted={data => {}}
        >
          {(addOrganiser, { loading, error, data }) => {
            return (
              <Formik
                validationSchema={validationSchema}
                initialValues={{}}
                onSubmit={async (values, actions) => {
                  console.log(values);
                  actions.setSubmitting(true);
                  await addOrganiser({
                    variables: {
                      input: {
                        organiserName: values.organiserName,
                        ownerNumber: values.organiserName,
                        ownerName: values.organiserName
                      }
                    }
                  });
                  actions.resetForm({});
                  this.notify("Organiser Saved Successfully");
                  actions.setSubmitting(false);
                }}
                render={({ errors, touched, isSubmitting, dirty, values }) => {
                  return (
                    <div class="container-fluid bg-light py-3">
                      <Form>
                        <div class="messages" />
                        <div class="controls">
                          <div class="row">
                            <div class="col-sm-12">
                              <div class="form-group">
                                <label for="organiserName">
                                  Organiser Name *
                                </label>
                                <Field
                                  type="text"
                                  name="organiserName"
                                  placeholder="Organiser Name"
                                  value={values.organiserName || ""}
                                  className={
                                    errors.organiserName &&
                                    touched.organiserName
                                      ? "form-control text-input  "
                                      : "form-control text-input"
                                  }
                                />
                                {touched.organiserName &&
                                  errors.organiserName && (
                                    <div class="help-block with-errors">
                                      {errors.organiserName}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div class="clearfix" />
                          <div class="row">
                            <div class="col-md-12 text-center">
                              <button
                                type="submit"
                                disabled={!dirty || isSubmitting}
                                className="btn btn-warning btn-send"
                              >
                                Save
                              </button>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-12">
                              <p class="text-muted">
                                <strong>*</strong> These fields are required.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  );
                }}
              />
            );
          }}
        </Mutation>
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </React.Fragment>
    );
  }
}

export default AddOrganiser;
