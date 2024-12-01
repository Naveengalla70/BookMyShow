using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interface
{
    public interface IAuthSL
    {
        Task<SignUpResponse> signup(SignUpRequest request);
        Task<SignInResponse> login(SignInRequest request);
        Task<BasicResponse> findEmail(string email);
        Task<BasicResponse> changePassword(string email, string password);
    }
}
