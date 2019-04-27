using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using TimeTrackingApi.Helpers;
using TimeTrackingApi.Services;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly HashPassword _hashPassword;

        public AuthController(IUserService userService, IConfiguration configuration, HashPassword hashPassword)
        {
            _userService = userService;
            _configuration = configuration;
            _hashPassword = hashPassword;
        }

        [HttpPost, Route("register")]
        public IActionResult RegisterUser(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll().ToArray();

            if (userViewModel.Password != userViewModel.ConfirmPassword)
            {
                return BadRequest("Lösenorden matchar inte.");
            }

            for (int i = 0; i < users.Length; i++)
            {
                if (users[i].Login.ToLower() == userViewModel.Login.ToLower())
                {
                    return BadRequest("Mailadressen är redan registerad.");
                }
            }

            var user = Mapper.ViewModelToModelMapping.UserViewModelToUser(userViewModel);
            var userPassword = _hashPassword.Hash(userViewModel.Password);
            user.Password = userPassword;

            _userService.Add(user);
            return Ok("Användaren har sparats, du skickas till login sidan inom 5 sekunder!");
        }
        [HttpPost, Route("login")]
        public IActionResult Login(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll().ToArray();
            for (int i = 0; i < users.Length; i++)
            {
                if (users[i].Login.ToLower() == userViewModel.Login.ToLower())
                {
                    bool isValid = _hashPassword.Verify(userViewModel.Password, users[i].Password);
                    if (isValid == true)
                    {
                        var appSettingsSection = _configuration.GetSection("AppSettings");

                        var appSettings = appSettingsSection.Get<Appsettings>();

                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                        var tokenOptions = new JwtSecurityToken(
                            issuer: "samuel",
                            audience: "readers",
                            expires: DateTime.Now.AddMinutes(60),
                            signingCredentials: signinCredentials
                        );
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                        var AuthUser = Mapper.ModelToViewModelMapping.UserViewmodel(users[i]);
                        AuthUser.Token = tokenString;
                        return Ok(AuthUser);
                    }
                }
            }
            return BadRequest("Användarnamnet eller lösenordet är felaktigt.");
        }
    }
}

