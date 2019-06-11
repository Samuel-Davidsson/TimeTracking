using System;
using System.Linq;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTrackingApi.Helpers;
using TimeTrackingApi.Services;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly IUserService _userService;
        private readonly IDeviationService _deviationService;
        private readonly UserControllerServices _userControllerServices;
        public UserController(IReportService reportService, IUserService userService, IDeviationService deviationService, 
            UserControllerServices userControllerServices)
        {
            _reportService = reportService;
            _userService = userService;
            _deviationService = deviationService;
            _userControllerServices = userControllerServices;
        }

        [HttpGet("{id}")]
        public IActionResult GetReportByUserId(int id)
        {
            var date = DateTime.Now.ToString("yyyy-MM");
            var reports = _reportService.GetReportsByUserId(id);
            var user = _userService.GetUserById(id);

            foreach (var report in reports)
            {
                if (report.Date.ToString("yyyy-MM") == date)
                {
                    var deviations = _deviationService.GetDeviationsByReportId(report.Id).ToList();
                    var updatedReport = _userControllerServices.SortReportDeviations(report, deviations);
                    var reportViewmodel = Mapper.ModelToViewModelMapping.ReportViewmodel(updatedReport);
                    reportViewmodel.FirstName = user.FirstName;
                    reportViewmodel.LastName = user.LastName;
                    return Ok(reportViewmodel);
                }
            }
            var reportViewmodelIfReportDoesntExit = Mapper.ModelToViewModelMapping.ReportViewmodelIfReportDoesntExit(user);
            return Ok(reportViewmodelIfReportDoesntExit);
        }
    }
}