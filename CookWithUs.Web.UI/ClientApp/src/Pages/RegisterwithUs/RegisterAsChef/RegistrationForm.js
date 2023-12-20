import React, { useState } from "react";
import { Box, TextField, Typography, Button, Chip } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const RegistrationForm = () => {
  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    console.log(filesArray);
    setFile(filesArray);
  };
  const handleDeleteFile = (indexToDelete) => {
    setFile(file?.filter((file, index) => index !== indexToDelete));
  };

  const handleFormSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Box sx={{ width: "100%", height: "40rem" }}>
      <Box sx={{ width: "92%", margin: "auto", mt: "60px" }}>
        <Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema[0]}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography sx={{ mb: "15px" }} fontSize="18px">
                    Register as a Chef
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
                    sx={{ gridColumn: "span 4", marginBottom: "15px" }}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4", marginBottom: "15px" }}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 4", marginBottom: "15px" }}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Select Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 4", marginBottom: "15px" }}
                  />
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        name="document"
                        multiple
                        onChange={(e) => handleFileChange(e)}
                      />
                    </Button>
                    <span>
                      {file.length > 0 ? (
                        <Box sx={{ display: "flex", gap: "2px" }}>
                          {file?.map((el, index) => (
                            <Box key={index}>
                              <Chip
                                label={el.name}
                                variant="outlined"
                                onDelete={() => handleDeleteFile(index)}
                              />
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        "No files chosen"
                      )}
                    </span>
                  </Box>
                </Box>
                <Box>
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
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const checkoutSchema = [
  yup.object().shape({
    name: yup
      .string()
      .required("Invalid Name")
      .required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address Number is required"),
  }),
];

export default RegistrationForm;
