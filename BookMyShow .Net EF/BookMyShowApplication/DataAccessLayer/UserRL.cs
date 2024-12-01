using CommonLayer;
using DataAccessLayer.Interface;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class UserRL : IUserRL
    {
        public readonly ApplicationDbContext _dbContext;
        public UserRL(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        public async Task<BasicResponse> AddBooking(AddBookingRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Add Booking Successfully";
            try
            {

                BookingDetail bookingDetail = new BookingDetail();
                bookingDetail.UserId = request.UserId;
                bookingDetail.Status = Model.Enum.Status.BOOKED;
                bookingDetail.MovieId = request.MovieId;
                bookingDetail.CreatedDate = DateTime.Now;
                bookingDetail.Quentity = request.Quentity;
                bookingDetail.TotalPrice = request.TotalPrice;
                await _dbContext.BookingDetail.AddAsync(bookingDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> AddProfile(AddProfileRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Add Profile Successfully";
            try
            {

                ProfileDetail profileDetail = new ProfileDetail();
                profileDetail.UserId = request.UserId;
                profileDetail.Name = request.Name;
                profileDetail.Email = request.Email;
                profileDetail.Address = request.Address;
                profileDetail.Contact = request.Contact;
                profileDetail.Age = request.Age;
                profileDetail.CreatedDate = DateTime.Now;
                await _dbContext.ProfileDetail.AddAsync(profileDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> AddReview(AddReviewRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Add Review Successfully";
            try
            {

                ReviewDetail reviewDetail = new ReviewDetail();
                reviewDetail.UserId = request.UserId;
                reviewDetail.movieId = request.movieId;
                reviewDetail.CreatedDate = DateTime.Now;
                reviewDetail.comment = request.comment;
                reviewDetail.rating = request.rating;
                reviewDetail.like = request.like;
                await _dbContext.ReviewDetail.AddAsync(reviewDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> DeleteReview(int Id)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Delete Review Successfully";
            try
            {

                var reviewDetail = await _dbContext.ReviewDetail.FirstOrDefaultAsync(x => x.Id == Id);
                if (reviewDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Review Not Exist";
                    return response;
                }

                _dbContext.ReviewDetail.Remove(reviewDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<dynamic> GetBooking(int UserId)
        {
            List<GetBookingResponse> data = new List<GetBookingResponse>();
            try
            {
                List<BookingDetail> response = await _dbContext.BookingDetail.Where(x => x.UserId == UserId).ToListAsync();

                var result =
                    from b in _dbContext.BookingDetail
                    join u in _dbContext.UserDetail on b.UserId equals u.UserId
                    join m in _dbContext.MovieDetail on b.MovieId equals m.Id
                    select new
                    {
                        b.Id,
                        u.email,
                        b.Status,
                        b.CreatedDate,
                        b.UserId,
                        b.MovieId,
                        m.MovieName,
                        b.Quentity,
                        b.TotalPrice
                    };
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
            return data;
        }

        public async Task<ProfileDetail> GetProfile(int UserId)
        {
            ProfileDetail response = new ProfileDetail();
            try
            {
                response = await _dbContext.ProfileDetail.FirstOrDefaultAsync(x => x.UserId == UserId);
            }
            catch (Exception ex)
            {
                return null;
            }
            return response;
        }

        public async Task<dynamic> GetReviewByMovieId(int MovieId)
        {
            try
            {
                var result =
                      from b in _dbContext.ReviewDetail
                      join m in _dbContext.MovieDetail on b.movieId equals m.Id
                      join u in _dbContext.UserDetail on b.UserId equals u.UserId
                      where b.movieId == MovieId
                      select new
                      {
                          b.Id,
                          u.email,
                          b.comment,
                          b.CreatedDate,
                          b.UserId,
                          b.like,
                          m.MovieName,
                          b.rating,
                          b.movieId
                      };
                return result;

            }
            catch (Exception ex)
            {
                return null;
            }
          
        }

        public async Task<List<MovieDetail>> SearchMovie(string keyWord)
        {
            try
            {

                return await _dbContext
                    .MovieDetail
                    .Where(x => x.IsActive && 
                                                ( x.MovieName.ToLower().Contains(keyWord.ToLower()) || 
                                                  x.MovieDescription.ToLower().Contains(keyWord.ToLower())) )
                    .ToListAsync();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<MovieDetail>> SearchMovieBycategory(string keyWord)
        {
            try
            {

                return await _dbContext
                    .MovieDetail
                    .Where(x => x.IsActive &&
                                                (x.Category.ToLower().Contains(keyWord.ToLower())))
                    .ToListAsync();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<BasicResponse> UpdateBooking(UpdateBookingRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Update Booking Successfully";
            try
            {
                var bookingDetail = await _dbContext.BookingDetail.FirstOrDefaultAsync(x => x.Id == request.Id);
                if (bookingDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Booking Not Exist";
                    return response;
                }

                bookingDetail.Status = request.Status;
                bookingDetail.Quentity = request.Quentity;
                bookingDetail.TotalPrice = request.TotalPrice;
                _dbContext.BookingDetail.Update(bookingDetail);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<BasicResponse> UpdateProfile(UpdateProfileRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Update Profile Successfully";
            try
            {
                var profileDetail = await _dbContext.ProfileDetail.FirstOrDefaultAsync(x => x.UserId == request.UserId);
                if (profileDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Profile Not Exist";
                    return response;
                }

                profileDetail.Name = request.Name;
                profileDetail.Email = request.Email;
                profileDetail.Address = request.Address;
                profileDetail.Contact = request.Contact;
                profileDetail.CreatedDate = DateTime.Now;
                profileDetail.Age = request.Age;
                _dbContext.ProfileDetail.Update(profileDetail);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<BasicResponse> UpdateReview(UpdateReviewRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Update Review Successfully";
            try
            {

                var reviewDetail = await _dbContext.ReviewDetail.FirstOrDefaultAsync(x => x.Id == request.Id);
                if (reviewDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Review Not Exist";
                    return response;
                }

                reviewDetail.comment = request.comment;
                reviewDetail.rating = request.rating;
                reviewDetail.like = request.like;
                _dbContext.ReviewDetail.Update(reviewDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
