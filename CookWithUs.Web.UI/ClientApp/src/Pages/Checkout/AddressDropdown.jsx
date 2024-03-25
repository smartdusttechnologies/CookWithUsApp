import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const AddressDropdown = ({ userId }) => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isNewAddress, setIsNewAddress] = useState(false);

    useEffect(() => {
        // Fetch addresses for the user when component mounts
        fetchAddresses();
    }, []);

    const fetchAddresses = () => {
        axios.get(`/api/address/${userId}`)
            .then(response => {
                setAddresses(response.data);
            })
            .catch(error => {
                console.error("Error fetching addresses:", error);
            });
    };

    const handleChange = (event) => {
        setSelectedAddress(event.target.value);
        setIsNewAddress(false);
    };

    const handleAddNewAddress = () => {
        setIsNewAddress(true);
        setSelectedAddress("");
    };

    const handleFormSubmit = (values) => {
        // Handle form submission
        console.log(values.address);
        axios.post(`/api/address/${userId}`, { address: values.address })
            .then(response => {
                fetchAddresses(); // Refresh addresses after adding new one
                setIsNewAddress(false);
            })
            .catch(error => {
                console.error("Error adding new address:", error);
            });
    };

    const formik = useFormik({
        initialValues: {
            address: ""
        },
        validationSchema: yup.object({
            address: yup.string().required("Address is required")
        }),
        onSubmit: handleFormSubmit
    });

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="address-label">Select Address</InputLabel>
                <Select
                    labelId="address-label"
                    value={selectedAddress}
                    onChange={handleChange}
                    fullWidth
                >
                    {addresses.map((address, index) => (
                        <MenuItem key={index} value={address}>{address}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            
        </div>
    );
};

export default AddressDropdown;
