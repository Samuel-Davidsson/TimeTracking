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
        private readonly ConvertUsersToViewModels _convertUsersToUserviewModels;
        public AdminController(IUserService userService, IReportService reportService, ConvertUsersToViewModels convertUsersToUserviewModels)
        {
            _userService = userService;
            _reportService = reportService;
            _convertUsersToUserviewModels = convertUsersToUserviewModels;
        }
        [HttpPost, Route("attestorapprovedchanged")]
        public IActionResult AttestOrApprovedChange(ReportViewmodel reportViewmodel)
        {
            var report = _reportService.GetReportById(reportViewmodel.Id);
            report.Attest = reportViewmodel.Attest;
            report.Accepted = reportViewmodel.Accepted;
            _reportService.Update(report);
            var updatedReportViewmodel = Mapper.ModelToViewModelMapping.ReportViewmodel(report);
            updatedReportViewmodel.FirstName = reportViewmodel.FirstName;
            updatedReportViewmodel.LastName = reportViewmodel.LastName;
            return Ok(updatedReportViewmodel);
        }
        [HttpGet("{id}")]
        public IActionResult GetUsersByAdminId(int id)
        {
            var adminUser = _userService.GetUserById(id);
            var users = _userService.GetAll().Where(x => x.Department == adminUser.Department && x.IsAdmin == false).ToArray();

            var userViewModels = _convertUsersToUserviewModels.ConvertUsersToModels(users, _reportService);

            return Ok(userViewModels);
        }
        [HttpPost, Route("getuserhistory")]
        public IActionResult GetUserHistoryById(UserViewmodel userViewmodel)
        {
            var reports = _reportService.GetReportsByUserId(userViewmodel.Id).ToArray();

            var userHistoryViewmodel = Mapper.ModelToViewModelMapping.UserHistoryViewmodel(userViewmodel, reports);

            return Ok(userHistoryViewmodel);
        }
    }
}