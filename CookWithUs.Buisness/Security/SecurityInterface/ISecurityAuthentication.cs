using CookWithUs.Buisness.Models;
using CookWithUs.Business.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Security.SecurityInterface
{
    public interface ISecurityAuthentication
    {
       public RequestResult<bool> CheckRiderDetails(RiderDetailsModel details);
    }
}
