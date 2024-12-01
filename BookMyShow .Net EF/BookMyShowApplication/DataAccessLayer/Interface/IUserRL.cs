using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IUserRL
    {
        Task<BasicResponse> AddProfile(AddProfileRequest request);
        Task<BasicResponse> UpdateProfile(UpdateProfileRequest request);
        Task<ProfileDetail> GetProfile(int UserId);

        Task<BasicResponse> AddBooking(AddBookingRequest request);
        Task<BasicResponse> UpdateBooking(UpdateBookingRequest request);
        Task<dynamic> GetBooking(int UserId);

        Task<BasicResponse> AddReview(AddReviewRequest request);
        Task<BasicResponse> UpdateReview(UpdateReviewRequest request);
        Task<dynamic> GetReviewByMovieId(int MovieId);
        Task<BasicResponse> DeleteReview(int Id);

        Task<List<MovieDetail>> SearchMovie(string keyWord);
        Task<List<MovieDetail>> SearchMovieBycategory(string keyWord);

    }
}
