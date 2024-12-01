using Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class GetBookingResponse
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }

        public UserDetail? UserDetail { get; set; }

        public int MovieId { get; set; }

        public Status Status { get; set; }

        public MovieDetail? MovieDetail { get; set; }

        public int Quentity { get; set; }

        public double TotalPrice { get; set; }
    }
}
