using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
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
        private readonly AuthControllerServices _authControllerServices;

        public AuthController(IUserService userService, IConfiguration configuration,
            HashPassword hashPassword, AuthControllerServices authControllerServices)
        {
            _userService = userService;
            _configuration = configuration;
            _hashPassword = hashPassword;
            _authControllerServices = authControllerServices;
        }

        [HttpPost, Route("register")]
        public IActionResult RegisterUser(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll().ToArray();
            if (userViewModel.Password != userViewModel.ConfirmPassword)
            {
                return BadRequest("Lösenorden matchar inte.");
            }
                bool emailExist = _authControllerServices.CheckMailAddress(users, userViewModel);
                if (emailExist == false)
                {
                    var user = Mapper.ViewModelToModelMapping.UserViewModelToUser(userViewModel);
                    user.Password = _hashPassword.Hash(userViewModel.Password);
                    _userService.Add(user);
                    return Ok("Användaren har sparats, du skickas till login sidan inom 5 sekunder!");

                }
            return BadRequest("Mailadressen är redan registerad.");

        }

        [HttpPost, Route("login")]
        public IActionResult Login(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll().ToArray();

            bool emailExist = _authControllerServices.CheckMailAddress(users, userViewModel);
            bool isValid = _authControllerServices.CheckPassword(users, userViewModel, _hashPassword);
            if (isValid == true && emailExist == true)
            {
                var user = _userService.GetUserByLogin(userViewModel.Login);
                var AuthUser = Mapper.ModelToViewModelMapping.UserViewmodel(user);
                var tokenString = _authControllerServices.CreateTokenToString(_configuration);
                AuthUser.Token = tokenString;
                return Ok(AuthUser);
            }
            return BadRequest("Användarnamnet eller lösenordet är felaktigt.");
        }
    }
}

