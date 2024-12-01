
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Model;
using ServiceLayer.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EPetShopApplication_BE.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthSL _authSL;
        private readonly IConfiguration _configuration;
        public AuthController(IAuthSL authRL, IConfiguration configuration)
        {
            _configuration = configuration;
            _authSL =  authRL; 
        }

        [HttpPost]
        public async Task<ActionResult> signup(SignUpRequest request)
        {
            SignUpResponse response = new SignUpResponse();
            try
            {
                response = await _authSL.signup(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(ex.Message);  
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult> login(SignInRequest request)
        {
            SignInResponse response = new SignInResponse();
            try
            {
               
                response = await _authSL.login(request);
                if (response.IsSuccess)
                {
                    string Type = string.Empty;
                    if (response.user.Role.ToString().Equals("ADMIN"))
                    {
                        Type = "ADMIN Login";
                    }
                    else
                    {
                        Type = "USER Login";
                    }
                    response = await CreateToken(response, Type);
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(ex.Message);

            }

            return Ok(response);
        }
        
        [HttpGet]
        public async Task<ActionResult> findEmail([FromQuery] string email)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _authSL.findEmail(email);
                if (!response.IsSuccess)
                {
                    return BadRequest(response);
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(ex.Message);
            }

            return Ok(response);
        }

        [HttpPatch]
        public async Task<ActionResult> changePassword([FromQuery] string email, string password)
        {
            BasicResponse response = new BasicResponse();
            try
            {
                response = await _authSL.changePassword(email, password);

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
                return BadRequest(ex.Message);
            }

            return Ok(response);
        }

        //Method to create JWT token
        private async Task<SignInResponse> CreateToken(SignInResponse request, string Type)
        {
            try
            {
                var symmetricSecuritykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signingCreds = new SigningCredentials(symmetricSecuritykey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Role, request.user.Role.ToString()));
                claims.Add(new Claim("UserName", request.user.email.ToString()));
                claims.Add(new Claim("UserId", request.user.UserId.ToString()));
                claims.Add(new Claim("TokenType", Type));

                var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audiance"],
                    claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signingCreds);
                request.token = new JwtSecurityTokenHandler().WriteToken(token);

            }
            catch (Exception ex)
            {
                request.IsSuccess = false;
                request.Message = "Exception Occur In Token Creation : Message : " + ex.Message;
               
            }
            return request;
        }

    }
}
