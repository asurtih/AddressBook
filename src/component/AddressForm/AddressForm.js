import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as stringConst from "../../Assets/stringConstant/stringConstant";
import Button from "react-bootstrap/Button";
import styles from "./AddressForm.module.css";
import { states } from "../../Assets/stateList";

export const AddressForm = ({
  address,
  onSaveAddress,
  handleCancel,
  addressTypeSelected
}) => {
  const initialValues = {
    firstName: address.firstName || "",
    lastName: address.lastName || "",
    middleName: "",
    addressLine1: address.addressLine1 || "",
    city: address.city || "",
    state: address.state || "",
    zipCode: address.zipCode || "",
    email: address.email || "",
    phone: address.phone || ""
  };

  const callBing = (postalCode, setFieldValue) => {
    const geocodeRequest =
      "https://dev.virtualearth.net/REST/v1/Locations?postalCode=" +
      postalCode +
      "&includeNeighborhood=true&include=ciso2&maxResults=5&key=Apsxi_I_Uk67iZwdjXvOOdSQWiOZ8kiR4IsxrPDaOMX0dKgeJekeDHG9ih2eH-DQ";
    fetch(geocodeRequest)
      .then(res => res.json())
      .then(data => {
        setFieldValue(
          "state",
          data.resourceSets[0].resources[0].address.adminDistrict
        );
        setFieldValue(
          "city",
          data.resourceSets[0].resources[0].address.locality
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={values =>
          onSaveAddress({
            ...values,
            id: address.id ? address.id : "",
            isPrimary: address.isPrimary ? address.isPrimary : false,
            addressType: address.addressType
              ? address.addressType
              : addressTypeSelected
          })
        }
      >
        {({ isSubmitting, handleChange, setFieldValue, values }) => (
          <Form>
            <div className="row">
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="firstName">{stringConst.FIRST_NAME}</label>
                <Field
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="lastName">{stringConst.LAST_NAME}</label>
                <Field
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
                <ErrorMessage name="lastName" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="addressLine1">
                  {stringConst.STREET_ADDRESS}
                </label>
                <Field
                  className="form-control"
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                />
                <ErrorMessage name="addressLine1" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="zipCode">{stringConst.ZIP_CODE}</label>
                <Field
                  className="form-control"
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  onChange={e => {
                    console.log("handleChange called");
                    handleChange(e);
                    let zipCodeLength = e.currentTarget.value;
                    if (zipCodeLength.trim().length > 4) {
                      callBing(e.currentTarget.value, setFieldValue);
                    }
                  }}
                />
                <ErrorMessage name="zipcode" component="div" />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="city">{stringConst.CITY}</label>
                <Field
                  className="form-control"
                  type="text"
                  name="city"
                  id="city"
                />
                <ErrorMessage name="city" component="div" />
              </div>
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="state">{stringConst.STATE}</label>
                <Field className="form-control" name="state" component="select">
                  {states.map(state => (
                    <option key={state.code} value={state.code}>
                      {state.displayName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="state" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="phone">{stringConst.PHONE}</label>
                <Field
                  className="form-control"
                  type="tel"
                  name="phone"
                  id="phone"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
                <ErrorMessage name="phone" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="email">{stringConst.EMAIL_ADDRESS}</label>
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                />
                <ErrorMessage name="email" component="div" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12 col-md-6">
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.btn}
                  onClick={handleCancel}
                >
                  {stringConst.CANCEL}
                </Button>
              </div>

              <div className="form-group col-sm-12 col-md-6">
                <Button type="submit" variant="primary" className={styles.btn}>
                  {stringConst.SAVE_ADDRESS}
                </Button>
              </div>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};
