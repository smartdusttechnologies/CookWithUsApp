using CookWithUs.Buisness.Models.Payment;
using CookWithUs.Web.UI.Models.Payment;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System;
using System.IO;

namespace CookWithUs.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : Controller
    {
        private readonly IConfiguration _configuration;
        public PaymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("InitiateRzpOrder")]
        public IActionResult InitiateOrder(PaymentDTO orderDetails)
        {
            string key = _configuration["PaymentGatewayKeys:RzpApiKey"];
            string secret = _configuration["PaymentGatewayKeys:RzpSecretKey"];

            Random _random = new Random();
            string TransactionId = _random.Next(0, 10000).ToString();

            Dictionary<string, object> input = new Dictionary<string, object>();
            input.Add("amount", Convert.ToDecimal(orderDetails.TotalAmount) * 100); // this amount should be same as transaction amount
            input.Add("currency", "INR");
            input.Add("receipt", TransactionId);


            RazorpayClient client = new RazorpayClient(key, secret);

            Order order = client.Order.Create(input);
            var orderId = order["id"].ToString();

            return Ok(orderDetails);
        }

        [HttpPost]
        [Route("confirmRzpPayment")]
        public async Task<IActionResult> ConfirmRazorpayPayment(ConfirmPaymentPayload confirmPayment)
        {
            var attributes = new Dictionary<string, string>
            {
                { "razorpay_payment_id", confirmPayment.razorpay_payment_id },
                { "razorpay_order_id", confirmPayment.razorpay_order_id },
                { "razorpay_signature", confirmPayment.razorpay_signature }
            };
            try
            {
                Utils.verifyPaymentSignature(attributes);
                // OR
                //var isValid = Utils.ValidatePaymentSignature(attributes);
                //if (isValid)
                //{
                //    var order = _razorpayClient.Order.Fetch(confirmPayment.razorpay_order_id);
                //    var payment = _razorpayClient.Payment.Fetch(confirmPayment.razorpay_payment_id);
                //    if (payment["status"] == "captured")
                //    {
                //        return Ok("Payment Successful");
                //    }
                //}
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost]
        [Route("CreatePaytmPayment")]
        public IActionResult CreatePaytmPayment(PaymentDTO data)
        {
            string merchantKey = _configuration["PaymentGatewayKeys:PaytmMerchantKey"];
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "MID", _configuration["PaymentGatewayKeys:PaytmMerchantId"] },
                { "CHANNEL_ID", "channel id value" },
                { "INDUSTRY_TYPE_ID", "industry value" },
                { "WEBSITE", "website value" },
                { "EMAIL", data.Email },
                { "MOBILE_NO", data.Mobile },
                { "CUST_ID", "1" },
                { "ORDER_ID", data.Id.ToString() },
                { "TXN_AMOUNT", data.TotalAmount.ToString() },
                { "CALLBACK_URL", "" } //This parameter is not mandatory. Use this to pass the callback url dynamically.
            };

            string checksum = paytm.CheckSum.generateCheckSum(merchantKey, parameters);
            parameters.Add("CHECKSUMHASH", checksum);

            string paytmURL = "https://securegw-stage.paytm.in/theia/processTransaction?orderid=" + parameters.FirstOrDefault(x => x.Key == "ORDER_ID").Value;
            parameters.Add("paytmURL", paytmURL);

            return Ok(parameters);
        }

        [HttpPost]
        [Route("PaytmPaymentCallback")]
        public IActionResult PaytmResponse(PaytmResponse data)
        {
            string merchantKey = _configuration["PaymentGatewayKeys:PaytmMerchantKey"];

            Dictionary<string, string> paytmParams = new Dictionary<string, string>
            {
                { "MID", data.MID },
                { "ORDER_ID", data.ORDERID }
            };

            var paytmChecksum = data.CHECKSUMHASH;
            bool verifySignature = Paytm.Checksum.verifySignature(paytmParams, merchantKey, paytmChecksum);
            if (verifySignature)
            {
                if (data.STATUS == "TXN_SUCCESS")
                {
                    return Redirect($"http://localhost:3000/success?orderId={data.ORDERID}&message={data.RESPMSG}");
                }
                else
                {
                    return Redirect($"http://localhost:3000/failure?orderId={data.ORDERID}&message={data.RESPMSG}");
                }
            }
            else
            {
                return BadRequest("something went wrong");
            }
        }
    }
}
