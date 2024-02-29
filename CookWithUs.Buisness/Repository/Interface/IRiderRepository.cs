using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CookWithUs.Buisness.Models;

namespace CookWithUs.Buisness.Repository.Interface
{
    public interface IRiderRepository
    {
         bool RiderRegister(RiderModel rider);
        List<RiderListModel> GetRiderList();
        bool OrderDetail(OrderHistoryModel orderHistory);
        List<RIderOrderModel> OrderListById(int id);
        bool OrderUpdate(int orderDetailId);

    }
}
