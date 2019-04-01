using System;
using System.Linq;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            var user = _userService.GetUserById(id);
            if(reports == null)
            {
                return Ok("No Reports");
            }

            foreach (var report in reports)
            {
                if (report.Date.ToString("yyyy-MM") == date)
                {
                    var deviations = _deviationService.GetDeviationsByReportId(report.Id);
                    report.DeviationItems = deviations.ToList();
                    var sortDeviations = report.DeviationItems.OrderByDescending(x => x.AbsenceDate);
                    report.DeviationItems = sortDeviations.ToList();
                    var reportViewmodel = Mapper.ModelToViewModelMapping.ReportViewmodel(report);

                    return Ok(reportViewmodel);
                }
            }
            return Ok(user);
        }
    }
}