import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import { ADD_VENDOR } from "./gql";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Yup = require("yup");
class AddVendor extends Component {
  notify(msg) {
    toast.warn(msg);
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          position={"bottom-center"}
        />
        <Mutation
          mutation={ADD_VENDOR}
          onError={e => {
            return "Abb";
          }}
          onCompleted={data => {
            // console.log(data);
          }}
        >
          {(addVendor, { loading, error, data }) => {
            return (
              <Formik
                // initialValues={{}}
                validationSchema={Yup.object().shape({
                  vendorName: Yup.string().required("Required Vendor Name")
                })}
                onSubmit={async (
                  values,
                  { setSubmitting, resetForm, setErrors }
                ) => {
                  //   console.log(values);

                  setSubmitting(true);
                  await addVendor({
                    variables: {
                      input: {
                        vendorName: values.vendorName,
                        vendorID: values.vendorID,
                        ownerName: values.ownerName,
                        ownerNumber: values.ownerNumber,
                        address: { address1: values.address },
                        contacts: { mobileNumber: values.contacts }
                      }
                    }
                  }).then(
                    f => {
                      console.log("FUL ERR", f);
                      resetForm();
                      this.notify("Vendor Saved Successfully!");
                      setSubmitting(false);
                    },
                    r => {
                      console.log("REJ ERR", r);
                      setSubmitting(false);
                    }
                  );
                  // .error(err => {
                  //   console.log(err);
                  //   setErrors({ vendorName: "Some ERROR!!!" });
                  // });
                }}
                render={vendorForm}
              />
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}
const vendorForm = ({ errors, touched, isSubmitting }) => {
  return (
    <React.Fragment>
      <h1>Vendor Form</h1>
      <div className="container">
        <Form>
          <div className="controls">
            <div className="row">
              <div className="col">
                <label htmlFor="vendorName">Vendor Name *</label>
                <Field
                  type="text"
                  name="vendorName"
                  placeholder="Vendor Name"
                />
                {touched.vendorName && errors.vendorName && errors.vendorName}
              </div>

              <div className="col">
                <label htmlFor="vendorID">Vendor ID *</label>
                <Field type="text" name="vendorID" placeholder="Vendor ID" />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="ownerName">Owner Name *</label>
                <Field type="text" name="ownerName" placeholder="Owner Name" />
              </div>

              <div className="col">
                <label htmlFor="ownerNumber">Owner Number *</label>
                <Field
                  type="text"
                  name="ownerNumber"
                  placeholder="Owner Number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="address">Vendor Address</label>
                <Field type="text" name="address" placeholder="Address" />
              </div>

              <div className="col">
                <label htmlFor="contacts">Contact Number </label>
                <Field
                  type="text"
                  name="contacts"
                  placeholder="Contact Number"
                />
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col" />
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddVendor;
