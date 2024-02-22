import axiosInstance from "../utils/axiosInstance";

export const InitiateRazorPayPayment = (details) => {
  return axiosInstance.post("payment/InitiateRzpOrder", details);
};
