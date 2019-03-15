using System;
using System.Linq;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTrackingApi.Viewmodels;

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
        public UserController(IReportService reportService, IUserService userService, IDeviationService deviationService)
        {
            _reportService = reportService;
            _userService = userService;
            _deviationService = deviationService;
        }

        [HttpGet("{id}")]
        public IActionResult GetReportByUserId(int id)
        {
            var date = DateTime.Now.ToString("yyyy-MM");
            var reports = _reportService.GetReportsByUserId(id);

            if(reports == null)
            {
                return Ok("No Reports");
            }

            var user = _userService.GetUserById(id);

            foreach (var report in reports)
            {
                if (report.Date.ToString("yyyy-MM") == date)
                {
                    var deviations = _deviationService.GetDeviationsByReportId(report.Id);
                    report.DeviationItems = deviations.ToList();
                    var sortDeviations = report.DeviationItems.OrderByDescending(x => x.AbsenceDate);
                    report.DeviationItems = sortDeviations.ToList();
                    var reportviewmodel = new ReportViewmodel
                    {
                        Id = report.Id,
                        UserId = report.UserId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        DeviationItems = report.DeviationItems,
                        Accepted = report.Accepted,
                        Attest = report.Attest,
                        CreatedDate = report.CreatedDate,
                        Date = report.Date,
                        UpdatedDate = report.UpdatedDate,
                    };
                    return Ok(reportviewmodel);
                };
            }
            return BadRequest("Existerar ingen rapport!");
        }
    }
}