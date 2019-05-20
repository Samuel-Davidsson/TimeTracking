using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
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
        private readonly MailAdressCheck _mailAdressCheck;
        private readonly CreateToken _createToken;
        private readonly PasswordCheck _passwordCheck;

        public AuthController(IUserService userService, IConfiguration configuration,
            HashPassword hashPassword, MailAdressCheck mailAdressCheck, CreateToken createToken, PasswordCheck passwordCheck)
        {
            _userService = userService;
            _configuration = configuration;
            _hashPassword = hashPassword;
            _mailAdressCheck = mailAdressCheck;
            _createToken = createToken;
            _passwordCheck = passwordCheck;
        }

        [HttpPost, Route("register")]
        public IActionResult RegisterUser(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll().ToArray();
            if (userViewModel.Password != userViewModel.ConfirmPassword)
            {
                return BadRequest("Lösenorden matchar inte.");
            }

            bool emailExist = _mailAdressCheck.MailAdressExist(users, userViewModel);
            if (emailExist == true)
            {
                return BadRequest("Mailadressen är redan registerad.");
            }

            var user = Mapper.ViewModelToModelMapping.UserViewModelToUser(userViewModel);
            user.Password = _hashPassword.Hash(userViewModel.Password);

            _userService.Add(user);
            return Ok("Användaren har sparats, du skickas till login sidan inom 5 sekunder!");
        }

        [HttpPost, Route("login")]
        public IActionResult Login(UserViewmodel userViewModel)
        {
            var users = _userService.GetAll().ToArray();

            for (int i = 0; i < users.Length; i++)
            {
                bool emailExist = _mailAdressCheck.MailAdressMatches(users[i], userViewModel);
                bool isValid = _passwordCheck.CheckPassword(users[i], userViewModel, _hashPassword);
                if (isValid == true && emailExist == true)
                {
                    var AuthUser = Mapper.ModelToViewModelMapping.UserViewmodel(users[i]);
                    var tokenString = _createToken.CreateTokenToString(_configuration);
                    AuthUser.Token = tokenString;
                    return Ok(AuthUser);
                }
            }
            return BadRequest("Användarnamnet eller lösenordet är felaktigt.");
        }
    }
}

