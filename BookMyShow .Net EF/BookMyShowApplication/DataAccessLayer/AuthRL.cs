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
    public class AuthRL : IAuthRL
    {
        public readonly ApplicationDbContext _dbContext;
        public AuthRL(ApplicationDbContext dbContext) {  _dbContext = dbContext; }

        public async Task<BasicResponse> changePassword(string email, string password)
        {
            BasicResponse response = new BasicResponse();
            response.IsSuccess = true;
            response.Message = "Change Password Successfully";
            try {

                var userDetail = await _dbContext
                    .UserDetail
                    .FirstOrDefaultAsync(x => x.email.ToLower() == email.ToLower());

                userDetail.password = password;
                _dbContext.UserDetail.Update(userDetail);
                await _dbContext.SaveChangesAsync();
            }
            catch(Exception ex) {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<BasicResponse> findEmail(string email)
        {
            BasicResponse response = new BasicResponse();
            try {

                var userDetail = await _dbContext
                    .UserDetail
                    .FirstOrDefaultAsync(x => x.email.ToLower() == email.ToLower());
                if (userDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Email Not Exist";
                }
                else
                {
                    response.IsSuccess = true;
                    response.Message = "Email Exist";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<SignInResponse> login(SignInRequest request)
        {
            SignInResponse response = new SignInResponse();
            response.IsSuccess = true;
            response.Message = "LogIn Successfully";
            try {

                var userDetail = await _dbContext
                    .UserDetail
                    .FirstOrDefaultAsync(x => x.email.ToLower() == request.email.ToLower() && x.password == request.password);

                if(userDetail == null)
                {
                    response.IsSuccess = false;
                    response.Message = "LogIn Failed";
                    return response;
                }

                userDetail.password = string.Empty;
                response.user = userDetail;

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<SignUpResponse> signup(SignUpRequest request)
        {
            SignUpResponse response = new SignUpResponse();
            response.IsSuccess = true;
            response.Message = "Sign Up Successfully";
            try {

                var IsEmailCheck = await _dbContext
                    .UserDetail
                    .FirstOrDefaultAsync(x => x.email.ToLower() == request.email.ToLower());
                if (IsEmailCheck != null)
                {
                    response.IsSuccess = false;
                    response.Message = "Email Already Exist";
                    return response;
                }

                UserDetail userDetail = new UserDetail();
                userDetail.CreatedDate = DateTime.Now;
                userDetail.password = request.password;
                userDetail.email = request.email;
                userDetail.Role = request.role;
                _dbContext.UserDetail.Add(userDetail);
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
