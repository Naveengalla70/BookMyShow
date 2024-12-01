using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLayer
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<UserDetail> UserDetail { get; set; }

        public DbSet<ProfileDetail> ProfileDetail { get; set; }

        public DbSet<MovieDetail> MovieDetail { get; set; }

        public DbSet<BookingDetail> BookingDetail { get; set; }

        public DbSet<ReviewDetail> ReviewDetail { get; set; }

        public DbSet<TheaterDetail> TheaterDetail { get; set; }

        /*public DbSet<WishListDetails> WishListDetails { get; set; }*/
    }
}
