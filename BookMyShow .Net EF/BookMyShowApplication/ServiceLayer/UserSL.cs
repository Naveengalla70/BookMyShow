using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interface;
using Model;
using ServiceLayer.Interface;

namespace ServiceLayer
{
    public class UserSL : IUserSL
    {
        private readonly IUserRL _userRL;
        public UserSL(IUserRL userRL)
        {
            _userRL = userRL;
        }

        public async Task<BasicResponse> AddBooking(AddBookingRequest request)
        {
            return await _userRL.AddBooking(request);
        }

        public async Task<BasicResponse> AddProfile(AddProfileRequest request)
        {
            return await _userRL.AddProfile(request);
        }

        public async Task<BasicResponse> AddReview(AddReviewRequest request)
        {
            return await _userRL.AddReview(request);
        }

        public async Task<BasicResponse> DeleteReview(int Id)
        {
            return await _userRL.DeleteReview(Id);
        }

        public async Task<dynamic> GetBooking(int UserId)
        {
            return await _userRL.GetBooking(UserId);
        }

        public async Task<ProfileDetail> GetProfile(int UserId)
        {
            return await _userRL.GetProfile(UserId);
        }

        public async Task<dynamic> GetReviewByMovieId(int MovieId)
        {
            return await _userRL.GetReviewByMovieId(MovieId);
        }

        public async Task<List<MovieDetail>> SearchMovie(string keyWord)
        {
            return await _userRL.SearchMovie(keyWord);
        }

        public async Task<List<MovieDetail>> SearchMovieBycategory(string keyWord)
        {
            return await _userRL.SearchMovieBycategory(keyWord);
        }

        public async Task<BasicResponse> UpdateBooking(UpdateBookingRequest request)
        {
            return await _userRL.UpdateBooking(request);
        }

        public async Task<BasicResponse> UpdateProfile(UpdateProfileRequest request)
        {
            return await _userRL.UpdateProfile(request);
        }

        public async Task<BasicResponse> UpdateReview(UpdateReviewRequest request)
        {
            return await _userRL.UpdateReview(request);
        }
    }
}
