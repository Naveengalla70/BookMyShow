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
    public class AuthSL : IAuthSL
    {
        public readonly IAuthRL _authRL;
        public AuthSL(IAuthRL authRL) 
        {
            _authRL = authRL;
        }
        public async Task<BasicResponse> changePassword(string email, string password)
        {
            return await _authRL.changePassword(email, password);
        }

        public async Task<BasicResponse> findEmail(string email)
        {
            return await _authRL.findEmail(email);
        }

        public async Task<SignInResponse> login(SignInRequest request)
        {
           return await _authRL.login(request);
        }

        public async Task<SignUpResponse> signup(SignUpRequest request)
        {
            return await _authRL.signup(request);
        }
    }
}
