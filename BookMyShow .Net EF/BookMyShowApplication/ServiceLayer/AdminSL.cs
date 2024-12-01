using DataAccessLayer;
using DataAccessLayer.Interface;
using Model;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class AdminSL : IAdminSL
    {
        private readonly IAdminRL _adminRL;
        public AdminSL(IAdminRL adminRL)
        {
            _adminRL = adminRL;
        }

        public async Task<BasicResponse> AddMovie(AddMovieRequest request)
        {
            return await _adminRL.AddMovie(request);
        }

        public async Task<BasicResponse> AddTheater(AddTheaterRequest request)
        {
            return await _adminRL.AddTheater(request);
        }

        public async Task<BasicResponse> DeleteMovie(int Id)
        {
            return await _adminRL.DeleteMovie(Id);
        }

        public async Task<BasicResponse> DeleteTheater(int Id)
        {
            return await _adminRL.DeleteTheater(Id: Id);
        }

        public async Task<dynamic> GetBookingList()
        {
            return await _adminRL.GetBookingList();
        }

        public async Task<List<MovieDetail>> GetMovie(int UserId)
        {
            return await _adminRL.GetMovie(UserId);
        }

        public async Task<MovieDetail> GetMovieById(int Id)
        {
            return await _adminRL.GetMovieById(Id);
        }

        public async Task<dynamic> GetReviewList()
        {
            return await _adminRL.GetReviewList();
        }

        public async Task<List<TheaterDetail>> GetTheater(int UserId)
        {
            return await _adminRL.GetTheater(UserId);
        }

        public async Task<BasicResponse> UpdateMovie(UpdateMovieRequest request)
        {
            return await _adminRL.UpdateMovie(request);
        }

        public async Task<BasicResponse> UpdateTheater(UpdateTheaterRequest request)
        {
            return await _adminRL.UpdateTheater(request);
        }
    }
}
