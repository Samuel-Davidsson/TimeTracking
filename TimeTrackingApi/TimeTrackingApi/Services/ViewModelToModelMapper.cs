using Domain.Entities;
using System;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    internal class ViewModelToModelMapper
    {
        public Report ReportViewModelToReport(ReportViewmodel model)
        {
            return new Report
            {
                Id = model.Id,
                UserId = model.UserId,
                Accepted = model.Accepted,
                Attest = model.Attest,
                DeviationItems = model.DeviationItems,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };
        }
        public User UserViewModelToUser(UserViewmodel userViewmodel)
        {
            return new User
            {
                Login = userViewmodel.Login,
                FirstName = userViewmodel.Firstname,
                LastName = userViewmodel.Lastname,
                Department = userViewmodel.Department,
            };
        }

    }
}
