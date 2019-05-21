using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var users = UserData().ToArray();
            var userViewmodel = UserViewModelData();

            //Act
            var actual = mailAdressCheck.CheckMailAddress(users, userViewmodel);

            //Assert
            Assert.True(actual);
        }

        [Fact]
        public void CheckPassword_Matches_ShouldReturnTrue()
        {
            //Arrange
            var checkPassword = new AuthControllerServices();
            var hashPassword = new HashPassword();
            var users = UserData().ToArray();
            var userViewmodel = UserViewModelData();

            //Act
            var actual = checkPassword.CheckPassword(users, userViewmodel, hashPassword);

            //Assert
            Assert.True(actual);
        }



        public List<User> UserData()
        {
            var users = new List<User>
            {
                new User {Id = 6, FirstName = "John", LastName = "Doe", Login = "John@gg.com", Password= "$HASH$V1$10000$zvl5M7hdC/4tXT8bGHVfH7uiu1UZGawjvzeG8zJERnR+29eg"},
                new User {Id = 2, FirstName = "Eric", LastName = "Evans", Login = "Eric@gg.com", Password= "$HASH$V1$10000$zvl5M7hdC/4tXT8bGHVfH7uiu1UZGawjvzeG8zJERnR+29eg"},
                new User {Id = 1, FirstName = "Samuel", LastName = "Davidsson", Login = "Sam@gg.com", Password= "$HASH$V1$10000$qTt+km4zoMn1HdgAesw6fRHdFki6dHjppnrIER2Zbvm//AmF"},
                new User {Id = 4, FirstName = "Kent", LastName = "Beck", Login = "Kent@gg.com", Password= "$HASH$V1$10000$zvl5M7hdC/4tXT8bGHVfH7uiu1UZGawjvzeG8zJERnR+29eg"},
                new User {Id = 5, FirstName = "Uncle", LastName = "Bob", Login = "Uncle@gg.com", Password= "$HASH$V1$10000$zvl5M7hdC/4tXT8bGHVfH7uiu1UZGawjvzeG8zJERnR+29eg"}
            };
            return users;
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
