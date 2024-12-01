using Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SignUpRequest
    {
        public string email { get; set; }
        public string password { get; set; }
        public Role role { get; set; }
    }
}
