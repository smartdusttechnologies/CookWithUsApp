using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RiderDetailsModel
    {
        public int Id { get; set; }
        public string Mobile { get; set; }
        public string Area { get; set; }
        public string VechicleType { get; set; }
        public string Shift { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DoorNo { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int Pincode { get; set; }
        public string LandMark { get; set; }
        public string Gender { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string IfscCode { get; set; }
        public string PanCard { get; set; }
        public string DrivingLicenceFront { get; set; }
        public string DrivingLicenceBack { get; set; }
        public string Image { get; set; }
        public bool IsDeleted { get; set; }
        public string Password { get; set; }
    }
}
