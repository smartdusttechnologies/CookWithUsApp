import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: "/", // Adjust this base URL according to your API endpoint
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("jwtToken");
        
        // Debug: Check if token is present
        console.log("Attempting to add token to headers:", token);
        
        if (token) {
            // Set Authorization header with Bearer token
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Handle request error
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors and redirect on 401
axiosInstance.interceptors.response.use(
    (response) => {
        // Return the response if it is successful
        return response;
    },
    (error) => {
        // Check if the response status is 401 (Unauthorized)
        if (error.response && error.response.status === 403) {
            // Get the URL of the failed request
            const requestUrl = error.config.url;
            
            // Debug: Log the unauthorized request URL
            console.error("401 Unauthorized error for URL:", requestUrl);

                // Remove token from local storage if unauthorized
                localStorage.removeItem("jwtToken");

                // Redirect to the login page or home page
                window.location.href = "/"; // Adjust the path as needed
        }
        else if (error.response && error.response.status === 500) {
            // Get the URL of the failed request
            const requestUrl = error.config.url;

            // Debug: Log the unauthorized request URL
            console.error("401 Unauthorized error for URL:", requestUrl);

            // Remove token from local storage if unauthorized
            localStorage.removeItem("jwtToken");

            // Redirect to the login page or home page
            window.location.href = "/"; // Adjust the path as needed
        }
        else {
            // Log other errors
            console.error("Response error:", error);
        }
        
        // Reject the promise to handle error further down the chain
        return Promise.reject(error);
    }
);

export default axiosInstance;
