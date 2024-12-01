using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ReviewDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public int movieId { get; set; }
        public string? comment {  get; set; }
        public double? rating { get; set; }
        public bool? like { get; set; } // null = Nutral, true = like, false = dislike
    }
}
