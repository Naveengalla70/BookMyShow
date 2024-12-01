using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class AddReviewRequest
    {
        public int UserId { get; set; }
        public int movieId { get; set; }
        public string? comment { get; set; }
        public double? rating { get; set; }
        public bool? like { get; set; } // null = Nutral, true = like, false = dislike
    }
}
