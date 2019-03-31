using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TimeTrackingApi.Helpers;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly Crypt _crypt;
        private readonly IConfiguration _configuration;
        public AuthController(IUserService userService, Crypt crypt, IConfiguration configuration)
        {
            _userService = userService;
            _crypt = crypt;
            _configuration = configuration;
        }

        [HttpPost, Route("register")]
        public IActionResult RegisterUser(UserViewmodel userViewModel)
        {
            var userpassword = _crypt.Encrypt(userViewModel.Password);
            var users = _userService.GetAll();
            foreach (var userLogin in users)
            {
                if(userLogin.Login.ToLower() == userViewModel.Login.ToLower())
                {
                    return BadRequest("Mailadressen är redan registerad.");
                }
            }
            var user = new User
            {
                Login = userViewModel.Login,
                Password = userpassword,
                FirstName = userViewModel.Firstname,
                LastName = userViewModel.Lastname,
                Department = userViewModel.Department,
            };
            _userService.Add(user);
            return Ok("Användaren har sparats, du skickas till login sidan inom 5 sekunder!");
        }
        [HttpPost, Route("login")]
        public IActionResult Login(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll();
            foreach (var user in users)
            {
                var userLogin = user.Login;
                var userPassword = _crypt.Encrypt(userViewModel.Password) ;
                var userLoginTrimEnd = userLogin.TrimEnd();

                if (userViewModel.Login.ToLower() == userLoginTrimEnd.ToLower() && user.Password == userPassword)
                {
                    var appSettingsSection = _configuration.GetSection("AppSettings");

                    var appSettings = appSettingsSection.Get<Appsettings>();

                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var tokenOptions = new JwtSecurityToken(
                        issuer: "samuel",
                        audience: "readers",
                        expires: DateTime.Now.AddMinutes(15),
                        signingCredentials: signinCredentials                      
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    var AuthUser = new UserViewmodel
                    {
                        Id = user.Id,
                        Firstname = user.FirstName,
                        Lastname = user.LastName,
                        IsAdmin = user.IsAdmin,
                        Token = tokenString,
                        ExpirationTime = DateTime.Now.AddMinutes(15)
                    };
                    return Ok(AuthUser);
                  }
            }
            return BadRequest("Användarnamnet eller lösenordet är felaktigt.");
        }

    }
 }

