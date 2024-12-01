using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SignInResponse
    {
        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
        public string? token { get; set; }
        public UserDetail user { get; set; }
    }
}
