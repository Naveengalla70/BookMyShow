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
    public class AdminRL : IAdminRL
    {
        public readonly ApplicationDbContext _dbContext;
        public AdminRL(ApplicationDbContext dbContext) { _dbContext = dbContext; }

        public async Task<BasicResponse> AddMovie(AddMovieRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Add Movie Successfully";
            try
            {

                Model.MovieDetail movieDetail = new MovieDetail();
                movieDetail.MovieName = request.MovieName;
                movieDetail.MovieDescription = request.MovieDescription;
                movieDetail.CreatedDate = DateTime.Now;
                movieDetail.ScreenNumber = request.ScreenNumber;
                movieDetail.Time = request.Time;
                movieDetail.PosterURL = request.PosterURL;
                movieDetail.Price = request.Price;
                movieDetail.Category = request.Category;
                await _dbContext.MovieDetail.AddAsync(movieDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> AddTheater(AddTheaterRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Add Theater Successfully";
            try
            {

                Model.TheaterDetail theaterDetail = new TheaterDetail();
                theaterDetail.CreatedDate = DateTime.Now;
                theaterDetail.theater = request.theater;
                theaterDetail.city = request.city;
                await _dbContext.TheaterDetail.AddAsync(theaterDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> DeleteMovie(int Id)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Delete Movie Successfully";
            try
            {

                var Response = await _dbContext.MovieDetail.FirstOrDefaultAsync(x => x.Id == Id);
                if(Response == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Movie Not Present";
                    return response;
                }
                Response.IsActive = false;
                _dbContext.MovieDetail.Update(Response);
                await _dbContext.SaveChangesAsync();
                
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> DeleteTheater(int Id)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Delete Theater Successfully";
            try
            {

                var Response = await _dbContext.TheaterDetail.FirstOrDefaultAsync(x => x.Id == Id);
                if (Response == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Theater Not Present";
                    return response;
                }
                
                _dbContext.TheaterDetail.Remove(Response);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<dynamic> GetBookingList()
        {
            try
            {

                List<BookingDetail> response = await _dbContext.BookingDetail.ToListAsync();

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
        }

        public async Task<List<Model.MovieDetail>> GetMovie(int UserId)
        {
            // List<MovieDetail> response = new List<MovieDetail>();

            try
            {

                return await _dbContext.MovieDetail.Where(x => x.IsActive).ToListAsync();

            }
            catch (Exception ex)
            {
                return null;
            }
            // return response;
        }

        public async Task<MovieDetail> GetMovieById(int Id)
        {
            try
            {

                return await _dbContext.MovieDetail.FirstOrDefaultAsync(x => x.Id==Id);

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<dynamic> GetReviewList()
        {
            try
            {
                var result =
                      from b in _dbContext.ReviewDetail
                      join u in _dbContext.UserDetail on b.UserId equals u.UserId
                      join m in _dbContext.MovieDetail on b.movieId equals m.Id
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

        public async Task<List<TheaterDetail>> GetTheater(int UserId)
        {
            try
            {

                return await _dbContext.TheaterDetail.ToListAsync();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<BasicResponse> UpdateMovie(UpdateMovieRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Update Movie Successfully";
            try
            {
                var movieDetail = await _dbContext.MovieDetail.FirstOrDefaultAsync(x => x.Id == request.Id);
                if (movieDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Movies Not Exist";
                    return response;
                }

                movieDetail.MovieName = request.MovieName;
                movieDetail.MovieDescription = request.MovieDescription;
                movieDetail.ScreenNumber = request.ScreenNumber;
                movieDetail.Time = request.Time;
                movieDetail.PosterURL = request.PosterURL;
                movieDetail.Price = request.Price;
                movieDetail.Category = request.Category;
                _dbContext.MovieDetail.Update(movieDetail);
                await _dbContext.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BasicResponse> UpdateTheater(UpdateTheaterRequest request)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Update Theater Successfully";
            try
            {
                var theaterDetail = await _dbContext.TheaterDetail.FirstOrDefaultAsync(x => x.Id == request.Id);
                if (theaterDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Theater Not Exist";
                    return response;
                }
                theaterDetail.theater = request.theater;
                theaterDetail.city = request.city;
                _dbContext.TheaterDetail.Update(theaterDetail);
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
