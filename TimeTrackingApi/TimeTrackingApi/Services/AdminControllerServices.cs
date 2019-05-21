using Domain.Entities;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using TimeTrackingApi.Helpers;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class AdminControllerServices
    {
        public List<UserViewmodelList> ConvertUsersToModels(User[] users, IReportService _reportService)
        {
            var date = DateTime.Now.ToString("yyyy-MM");
            var userViewModels = new List<UserViewmodelList>();

            for (int i = 0; i < users.Length; i++)
            {
                var userViewmodel = Mapper.ModelToViewModelMapping.UserViewmodelList(users[i]);
                var reports = _reportService.GetReportsByUserId(users[i].Id).Where(x => x.Date.ToString("yyyy-MM") == date).ToArray();
                userViewModels.Add(userViewmodel);
            }
            return userViewModels;
        }
    }
}
