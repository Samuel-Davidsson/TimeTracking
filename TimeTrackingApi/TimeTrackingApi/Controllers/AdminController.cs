using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using TimeTrackingApi.Services;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IReportService _reportService;
        public AdminController(IUserService userService, IReportService reportService)
        {
            _userService = userService;
            _reportService = reportService;
        }
        [HttpGet("{id}")]
        public IActionResult GetUsersByAdminId(int id)
        {
            var adminUser = _userService.GetUserById(id);
            var users = _userService.GetAll().Where(x => x.Department == adminUser.Department && x.IsAdmin == false).ToArray();

            var date = DateTime.Now.ToString("yyyy-MM");
            var userViewModels = new List<UserViewmodelList>();

            for (int i = 0; i < users.Length; i++)
            {
                var userViewmodel = Mapper.ModelToViewModelMapping.UserViewmodelList(users[i]);
                var reports = _reportService.GetReportsByUserId(users[i].Id).Where(x => x.Date.ToString("yyyy-MM") == date).ToArray();
                //var attest = false;
                //for (int r = 0; r < reports.Length; r++)
                //{
                //    attest = reports[r].Attest;
                //}
                //userViewmodel.Attest = attest;
                userViewModels.Add(userViewmodel);
            }
            return Ok(userViewModels);
        }
        [HttpPost, Route("getuserhistory")]
        public IActionResult GetUserHistoryById(UserViewmodel userViewmodel)
        {
            var reports = _reportService.GetReportsByUserId(userViewmodel.Id).ToArray();

            var date = DateTime.Now;
            var currentMonth = date.ToString("yyyy-MM");

            var userHistoryViewmodel = new UserHistoryViewmodel
            {
                Id = userViewmodel.Id,
                Firstname = userViewmodel.Firstname,
                Lastname = userViewmodel.Lastname,
                Reports = reports,
            };
            for (int i = 0; i < reports.Length; i++)
            {
                if (reports[i].Date.ToString("yyyy-MM") == currentMonth)
                {
                    _reportService.GetReportById(reports[i].Id);
                    var sortDeviations = reports[i].DeviationItems.OrderByDescending(x => x.AbsenceDate);
                    reports[i].DeviationItems = sortDeviations.ToList();
                    userHistoryViewmodel.report = reports[i];
                }
            }
            return Ok(userHistoryViewmodel);
        }
    }
}