using Domain.Entities;
using Domain.Services;
using System;
using System.Collections.Generic;
using TimeTrackingApi.Services;
using TimeTrackingApi.Viewmodels;
using Xunit;

namespace TimeTrackingApi.Tests
{
    public class TimeTrackingServices
    {
        [Fact]
        public void MailAddress_Matches_ShouldReturnTrue()
        {
            //Arrange
            var mailAdressCheck = new AuthControllerServices();
            var user = UserData();
            var userViewmodel = UserViewModelData();

            //Act
            var actual = mailAdressCheck.CheckMailAddress(user, userViewmodel);

            //Assert
            Assert.True(actual);
        }

        [Fact]
        public void CheckPassword_Matches_ShouldReturnTrue()
        {
            //Arrange
            var checkPassword = new AuthControllerServices();
            var hashPassword = new HashPassword();
            var user = UserData();
            var userViewmodel = UserViewModelData();

            //Act
            var actual = checkPassword.CheckPassword(user, userViewmodel, hashPassword);

            //Assert
            Assert.True(actual);
        }



        public User UserData()
        {
            var user = new User { Id = 1, Login = "Sam@gg.com", Password= "$HASH$V1$10000$qTt+km4zoMn1HdgAesw6fRHdFki6dHjppnrIER2Zbvm//AmF", FirstName = "Samuel", LastName = "Davidsson" };
            return user;           
        }

        public UserViewmodel UserViewModelData()
        {
            var userViewmodel = new UserViewmodel()
            {
                Id = 1,
                Login = "Sam@gg.com",
                Password= "mamma",
                Firstname = "Samuel",
                Lastname = "Davidsson"
            };
            return userViewmodel;
        }
    }
}
