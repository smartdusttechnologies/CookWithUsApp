using CookWithUs.Buisness.Models.Payment;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

namespace CookWithUs.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : Controller
    {
        //public OrderEntity _OrderDetails { get; set; }

        private RazorpayClient _razorpayClient;
        public PaymentController()
        {
            _razorpayClient = new RazorpayClient("key",
                "secret");
        }

        [HttpPost]
        [Route("initialize")]
        public async Task<IActionResult> InitializePayment()
        {
            var options = new Dictionary<string, object>
            {
                { "amount", 200 },
                { "currency", "INR" },
                { "receipt", "recipt_1" },
                // auto capture payments rather than manual capture
                // razor pay recommended option
                { "payment_capture", true }
            };

            var order = _razorpayClient.Order.Create(options);
            var orderId = order["id"].ToString();
            var orderJson = order.Attributes.ToString();
            return Ok(orderJson);
        }

        [HttpPost]
        [Route("InitiateOrder")]
        public IActionResult InitiateOrder(OrderEntity orderDetails)
        {
            string key = "<Enter your Api Key here>";
            string secret = "<Enter your Api Secret here>";

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

        public class ConfirmPaymentPayload
        {
            public string razorpay_payment_id { get; }
            public string razorpay_order_id { get; }
            public string razorpay_signature { get; }
        }

        [HttpPost]
        [Route("confirm")]
        public async Task<IActionResult> ConfirmPayment(ConfirmPaymentPayload confirmPayment)
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
    }
}
