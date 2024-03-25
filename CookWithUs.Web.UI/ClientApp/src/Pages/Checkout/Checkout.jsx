import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlaceOrder } from  "../../services/restaurantServices";

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState([]);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const getCartData = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  };

  useEffect(() => {
    getCartData();
  }, []);

  const handleFormSubmit = async (values, actions) => {
    // console.log(values);
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    // const stripe = await stripePromise;
    //const requestBody = {
    //  userID: 1,
    //  address: values.billingAddress.street1,
    //  zipCode: values.billingAddress.zipCode,
    //  orderPrice: cart.reduce(
    //    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    //    0
    //  ),
    //  phone: values.phoneNumber,
    //  products: cart.map(({ id, quantity }) => ({
    //      ProductID: id,
    //      Quantity:quantity,
    //      OrderID: "",
    //      Name: "",
    //      Type: "",
    //      ImageUrl: "",
    //      Price: ""

    //  })),
    //  };
    //  const dummyData = {
    //      userID: 1,
    //      address: values.billingAddress.street1,
    //      zipCode: values.billingAddress.zipCode,
    //      orderPrice: cart.reduce(
    //          (total, cartItem) => total + cartItem.price * cartItem.quantity,
    //          0
    //      ),
    //      phone: values.phoneNumber,
    //      products: cart.map(({ id, quantity }) => ({
    //          ProductID: id,
    //          Quantity: quantity,
    //          OrderID: "",
    //          Name: "",
    //          Type: "",
    //          ImageUrl: "",
    //          Price: ""
    //      }))
    //  };
      const dummyData = {
          UserID: 1,
          Address: "123 Main St",
          Zipcode: "12345",
          OrderPrice: 50,
          Phone: "8709282126",
          products: [
              {
                  OrderID: 1,
                  ProductID: 2,
                  Name: "Dummy Product 1",
                  Type: "Type A",
                  ImageUrl: "https://example.com/image1.jpg",
                  Price: 10,
                  Quantity: 2
              },
              {
                  OrderID: 2,
                  ProductID: 2,
                  Name: "Dummy Product 2",
                  Type: "Type B",
                  ImageUrl: "https://example.com/image2.jpg",
                  Price: 15,
                  Quantity: 3
              }
          ]
      };
      /*axios.post("/resturant/PlaceOrder", requestBody)*/
      PlaceOrder(dummyData).then((response) => {
      console.log(response.data);
      navigate("/payment");    
    });
  }

  return (
    <Box width="80%" m="100px auto">
      {/*<Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>*/}
      {/*  <Step>*/}
      {/*    <StepLabel>Billing</StepLabel>*/}
      {/*  </Step>*/}
      {/*  <Step>*/}
      {/*    <StepLabel>Payment</StepLabel>*/}
      {/*  </Step>*/}
      {/*</Stepper>*/}
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
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
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: "",
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: "",
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  //shippingAddress: {
  //  isSameAddress: true,
  //  firstName: "",
  //  lastName: "",
  //  country: "",
  //  street1: "",
  //  street2: "",
  //  city: "",
  //  state: "",
  //  zipCode: "",
  //},
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
