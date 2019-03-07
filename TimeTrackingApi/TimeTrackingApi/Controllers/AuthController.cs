using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost, Route("login")]
        public IActionResult Login(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll();
            foreach (var user in users)
            {
                var userLogin = user.Login;
                var userPassword = user.Password;
                var userLoginTrimEnd = userLogin.TrimEnd();

                if (userViewModel.Login.ToLower() == userLoginTrimEnd.ToLower() && userViewModel.Password == userPassword)
                {

                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    // Setup claim routes later.

                    //var claims = new List<Claim>
                    //{
                    //    new Claim(ClaimTypes.Name, user.Login),
                    //    new Claim(ClaimTypes.Role, "Manager")
                    //};

                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:5000",
                        audience: "http://localhost:5000",
                        claims: new List<Claim>(), //sätta claims här.
                        expires: DateTime.Now.AddMinutes(5),
                        signingCredentials: signinCredentials
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    var AuthUser = new UserViewmodel
                    {
                        Id = user.Id,
                        Firstname = user.FirstName,
                        Lastname = user.LastName,
                        IsAdmin = user.IsAdmin,
                        Token = tokenString
                    };
                    return Ok(AuthUser);
                  }
            }
            return BadRequest("Användarnamnet eller lösenordet är felaktigt.");
        }

    }
 }

