using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ProfileDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }

        public string? Contact { get; set; }

        public int Age { get; set; }
    }
}
