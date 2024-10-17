using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class PasswordLogin
    {
        /// <summary>
        /// UserId
        /// </summary>
        public int UserId { get; set; }
        /// <summary>
        /// PasswordHash
        /// </summary>
        public string PasswordHash { get; set; }
        /// <summary>
        /// PasswordSlat
        /// </summary>
        public string PasswordSalt { get; set; }
        /// <summary>
        /// ChangeDate
        /// </summary>
        public DateTime ChangeDate { get; set; }

        /// <summary>
        /// RoleId
        /// </summary>
        public int RoleId { get; set; }
    }
}
