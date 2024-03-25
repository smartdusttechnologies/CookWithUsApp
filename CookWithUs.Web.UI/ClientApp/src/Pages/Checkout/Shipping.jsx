//import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
//import AddressForm from "./AddressForm";

//const Shipping = ({
//  values,
//  touched,
//  errors,
//  handleChange,
//  handleBlur,
//  setFieldValue,
//}) => {
//  return (
//    <Box m="30px auto">
//      {/* BILLING FORM */}
//      <Box>
//        <Typography sx={{ mb: "15px" }} fontSize="18px">
//          Billing Information
//        </Typography>
//        <AddressForm
//          type="billingAddress"
//          values={values.billingAddress}
//          touched={touched}
//          errors={errors}
//          handleBlur={handleBlur}
//          handleChange={handleChange}
//        />
//      </Box>

//      <Box mb="20px">
//        <FormControlLabel
//          control={
//            <Checkbox
//              defaultChecked
//              value={values.shippingAddress.isSameAddress}
//              onChange={() =>
//                setFieldValue(
//                  "shippingAddress.isSameAddress",
//                  !values.shippingAddress.isSameAddress
//                )
//              }
//            />
//          }
//          label="Same for Shipping Address"
//        />
//      </Box>

//      {/* SHIPPING FORM */}
//      {!values.shippingAddress.isSameAddress && (
//        <Box>
//          <Typography sx={{ mb: "15px" }} fontSize="18px">
//            Shipping Information
//          </Typography>
//          <AddressForm
//            type="shippingAddress"
//            values={values.shippingAddress}
//            touched={touched}
//            errors={errors}
//            handleBlur={handleBlur}
//            handleChange={handleChange}
//          />
//        </Box>
//      )}
//    </Box>
//  );
//};

//export default Shipping;
import React from "react";
import {
    Box,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { AddAddress } from "../../services/UserService"

const Shipping = () => {
    const handleFormSubmit = (values, { setSubmitting }) => {
        // Handle form submission logic here
        console.log(values);
        AddAddress(values). then((response) => {

            console.log(response);
            // Handle response here
        })
            .catch((error) => {
                console.log(error);
                // Handle error here
            });
        setSubmitting(false);
    };

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ width: "92%", margin: "auto", mt: "40px", mb: "30px" }}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Typography sx={{ mb: "15px" }} fontSize="18px">
                                Delivery Address
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                label="Full Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Country"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.country}
                                name="country"
                                error={!!touched.country && !!errors.country}
                                helperText={touched.country && errors.country}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Street Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.streetAddress}
                                name="streetAddress"
                                error={!!touched.streetAddress && !!errors.streetAddress}
                                helperText={touched.streetAddress && errors.streetAddress}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Street Address 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.streetAddress2}
                                name="streetAddress2"
                                error={!!touched.streetAddress2 && !!errors.streetAddress2}
                                helperText={touched.streetAddress2 && errors.streetAddress2}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="City"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.city}
                                name="city"
                                error={!!touched.city && !!errors.city}
                                helperText={touched.city && errors.city}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="State"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.state}
                                name="state"
                                error={!!touched.state && !!errors.state}
                                helperText={touched.state && errors.state}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Pincode"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.pincode}
                                name="pincode"
                                error={!!touched.pincode && !!errors.pincode}
                                helperText={touched.pincode && errors.pincode}
                                sx={{ marginBottom: "15px" }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                label="Mobile No"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.mobileNo}
                                name="mobileNo"
                                error={!!touched.mobileNo && !!errors.mobileNo}
                                helperText={touched.mobileNo && errors.mobileNo}
                                sx={{ marginBottom: "15px" }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{
                                    borderRadius: 0,
                                    padding: "15px 40px",
                                    marginTop: "15px",
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

const initialValues = {
    Id: '6',
    UserId:'0',
    name: "",
    country: "",
    streetAddress: "",
    streetAddress2: "43",
    city: "",
    state: "",
    pincode: "",
    mobileNo: "",
};

const validationSchema = yup.object().shape({
    name: yup.string().required("Full Name is required"),
    country: yup.string().required("Country is required"),
    streetAddress: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pincode: yup.string().required("Pincode is required"),
    mobileNo: yup.string().required("Mobile No is required"),
});

export default Shipping;

