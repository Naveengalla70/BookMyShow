using Model.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class BookingDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }

        public int MovieId { get; set; }

        public Status Status { get; set; }

        public int Quentity {  get; set; }

        public double TotalPrice { get; set; }
    }
}
