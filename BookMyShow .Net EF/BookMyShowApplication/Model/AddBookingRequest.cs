using Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AddBookingRequest
    {
        public int UserId { get; set; }

        public int MovieId { get; set; }

        public Status Status { get; set; }

        public int Quentity { get; set; }

        public double TotalPrice { get; set; }

    }
}
