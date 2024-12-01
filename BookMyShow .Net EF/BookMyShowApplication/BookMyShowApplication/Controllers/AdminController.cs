using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using ServiceLayer.Interface;

namespace BookMyShowApplication.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminSL _adminSL;
        public AdminController(IAdminSL adminSL)
        {
            _adminSL = adminSL;
        }

        [HttpPost]
        public async Task<ActionResult> AddMovie(AddMovieRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _adminSL.AddMovie(request);
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
        public async Task<ActionResult> UpdateMovie(UpdateMovieRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _adminSL.UpdateMovie(request);
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
        public async Task<ActionResult> GetMovie()
        {
            int UserId = 0;
            List<MovieDetail> response = new List<MovieDetail>();
            try
            {
                response = await _adminSL.GetMovie(UserId);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult> GetMovieById([FromQuery]int Id)
        {
            MovieDetail response = new MovieDetail();
            try
            {
                response = await _adminSL.GetMovieById(Id);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(response);
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteMovie([FromQuery]int Id)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _adminSL.DeleteMovie(Id);
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
        public async Task<ActionResult> GetBookingList()
        {
            try
            {
               var response = await _adminSL.GetBookingList();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet]
        public async Task<ActionResult> GetReviewList()
        {
            //List<GetBookingResponse> response = new List<GetBookingResponse>();
            try
            {
                var response = await _adminSL.GetReviewList();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }


        }


        [HttpPost]
        public async Task<ActionResult> AddTheater(AddTheaterRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _adminSL.AddTheater(request);
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
        public async Task<ActionResult> UpdateTheater(UpdateTheaterRequest request)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _adminSL.UpdateTheater(request);
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
        public async Task<ActionResult> GetTheater()
        {
            int UserId = 0;
            List<TheaterDetail> response = new List<TheaterDetail>();
            try
            {
                response = await _adminSL.GetTheater(UserId);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(response);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteTheater([FromQuery] int Id)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _adminSL.DeleteTheater(Id);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(response);
            }

            return Ok(response);
        }

    }
}
