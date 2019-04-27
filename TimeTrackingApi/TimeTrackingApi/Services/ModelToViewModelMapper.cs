using Domain.Entities;
using System;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    internal class ModelToViewModelMapper
    {
        public DeviationViewmodel DeviationViewmodel(Deviation deviation)
        {
            return new DeviationViewmodel
            {
                Hours = deviation.Hours,
                Description = deviation.Description,
                AbsenceDate = deviation.AbsenceDate,
            };
        }
        public ReportViewmodel ReportViewmodel(Report report)
        {
            return new ReportViewmodel
            {
                Id = report.Id,
                Accepted = report.Accepted,
                Attest = report.Attest,
                CreatedDate = report.CreatedDate,
                Date = report.Date,
                DeviationItems = report.DeviationItems,
                UpdatedDate = report.UpdatedDate,
                UserId = report.UserId
            };
        }
        public UserViewmodel UserViewmodel(User user)
        {
            return new UserViewmodel
            {
                Id = user.Id,
                Firstname = user.FirstName,
                Lastname = user.LastName,
                IsAdmin = user.IsAdmin,
                ExpirationTime = DateTime.Now.AddMinutes(60)
            };
        }
        public UserViewmodelList UserViewmodelList(User user)
        {
            return new UserViewmodelList
            {
                Id = user.Id,
                Firstname = user.FirstName,
                Lastname = user.LastName,
                Department = user.Department
            };
        }
    }
}