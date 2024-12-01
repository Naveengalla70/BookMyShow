using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IAdminRL
    {
        Task<BasicResponse> AddMovie(AddMovieRequest request);
        Task<BasicResponse> UpdateMovie(UpdateMovieRequest request);
        Task<List<MovieDetail>> GetMovie(int UserId);
        Task<BasicResponse> DeleteMovie(int Id);
        Task<dynamic> GetBookingList();
        Task<MovieDetail> GetMovieById(int Id);
        Task<dynamic> GetReviewList();

        Task<BasicResponse> AddTheater(AddTheaterRequest request);
        Task<BasicResponse> UpdateTheater(UpdateTheaterRequest request);
        Task<List<TheaterDetail>> GetTheater(int UserId);
        Task<BasicResponse> DeleteTheater(int Id);
    }
}
