using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class UpdateMovieRequest
    {
        public int Id { get; set; }
        public string? MovieName { get; set; }
        public string? MovieDescription { get; set; }
        public string? PosterURL { get; set; }
        public double Price { get; set; }
        public int ScreenNumber { get; set; }
        public string? Time { get; set; }
        public string? Category { get; set; }
    }
}
