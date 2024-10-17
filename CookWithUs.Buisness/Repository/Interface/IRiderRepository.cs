using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CookWithUs.Buisness.Models;
using CookWithUs.Business.Common;

namespace CookWithUs.Buisness.Repository.Interface
{
    public interface IRiderRepository
    {
         bool RiderRegister(RiderModel rider);
        List<RiderListModel> GetRiderList();
        bool OrderDetail(OrderHistoryModel orderHistory);
        List<RIderOrderModel> OrderListById(int id);
        
        bool OrderUpdate(int orderDetailId);
        FindOrderModel FindOrder(int Id);
        public RiderDetailsModel GetRiderDetailsById(int ID);
        RequestResult<bool> SetRiderStatus(SetOrderStatusModel details);
        public RequestResult<bool> AssignRider(FindOrderModel assignDetails);
        public RequestResult<bool> RiderStatus(FindOrderModel assignDetails);
        public RequestResult<bool> RiderSignup(RiderDetailsModel riderAllDetails, PasswordLogin passwordLogin);
        public RequestResult<bool> SendRequestOfRider(SendOrderRequestModel allRiderDetails);
        public List<OrderHistoryModel> GetOrderDetailsById(int id);
        public RequestResult<bool> CheckMobileNumber(string mobileNumber);
        public RequestResult<bool> DeleteAllOTP(string otpDetails);
        public RequestResult<bool> AddOTP(ManageOtpModel details);
        public ManageOtpModel MatchOTP(string details);
        public RiderDetailsModel GetRiderLoginDetailsByUserName(string username);
        public PasswordLogin GetRiderPassworByUserId(int userId);
    }
}