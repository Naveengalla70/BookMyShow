using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using ServiceLayer.Interface;

namespace BookMyShowApplication.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserSL _userSL;
        public UserController(IUserSL userSL)
        {
            _userSL = userSL;
        }

        [HttpPost]
        public async Task<ActionResult> AddProfile(AddProfileRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _userSL.AddProfile(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile(UpdateProfileRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _userSL.UpdateProfile(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }


        [HttpGet]
        public async Task<ActionResult> GetProfile([FromQuery] int UserId)
        {
            ProfileDetail response = new ProfileDetail();
            try
            {
                response = await _userSL.GetProfile(UserId);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(response);
        }


        [HttpPost]
        public async Task<ActionResult> AddBooking(AddBookingRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _userSL.AddBooking(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBooking(UpdateBookingRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _userSL.UpdateBooking(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }


        [HttpGet]
        public async Task<ActionResult> GetBooking([FromQuery] int UserId)
        {
            //List<GetBookingResponse> response = new List<GetBookingResponse>();
            try
            {
              var  response = await _userSL.GetBooking(UserId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            
        }


        [HttpPost]
        public async Task<ActionResult> AddReview(AddReviewRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _userSL.AddReview(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateReview(UpdateReviewRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _userSL.UpdateReview(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }


        [HttpGet]
        public async Task<ActionResult> GetReviewByMovieId([FromQuery] int MovieId)
        {
            //List<GetBookingResponse> response = new List<GetBookingResponse>();
            try
            {
                var response = await _userSL.GetReviewByMovieId(MovieId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }


        }

        [HttpDelete]
        public async Task<ActionResult> DeleteReview([FromQuery] int Id)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                 response = await _userSL.DeleteReview(Id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }


        }


        [HttpGet]
        public async Task<ActionResult> SearchMovie([FromQuery] string keyWord)
        {
            //List<GetBookingResponse> response = new List<GetBookingResponse>();
            try
            {
                var response = await _userSL.SearchMovie(keyWord);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<ActionResult> SearchMovieBycategory([FromQuery] string keyWord)
        {
            //List<GetBookingResponse> response = new List<GetBookingResponse>();
            try
            {
                var response = await _userSL.SearchMovieBycategory(keyWord);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }


        }
    }
}
