using Domain.Entities;
using Domain.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TimeTrackingApi.Helpers;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class AuthControllerServices
    {

        public string CreateTokenToString(IConfiguration _configuration)
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
            return tokenString;
        }

        public bool CheckMailAddress(User[] users, UserViewmodel userViewmodel)
        {
            for (int i = 0; i < users.Length; i++)
            {
                if (users[i].Login.ToLower() == userViewmodel.Login.ToLower())
                {
                    return true;
                }
            }
            return false;
        }

        public bool CheckPassword(User[] users, UserViewmodel userViewmodel, HashPassword _hashPassword)
        {
            for (int i = 0; i < users.Length; i++)
            {
                if (_hashPassword.Verify(userViewmodel.Password, users[i].Password))
                {
                    return true;
                }
            }
            return false;
        }

    }
}
