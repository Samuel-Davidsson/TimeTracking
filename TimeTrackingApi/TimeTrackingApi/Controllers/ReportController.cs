using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using TimeTrackingApi.Services;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReportController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IReportService _reportService;
        private readonly IDeviationService _deviationService;

        public ReportController(IUserService userService, IReportService reportService, IDeviationService deviationService)
        {
            _userService = userService;
            _reportService = reportService;
            _deviationService = deviationService;
        }

        [HttpGet("{id}")]
        public IActionResult GetReportById(int id)
        {
            var report = _reportService.GetReportById(id);
            var user = _userService.GetUserById(report.UserId);
            var reportViewmodel = Mapper.ModelToViewModelMapping.ReportViewmodel(report);
            reportViewmodel.FirstName = user.FirstName;
            reportViewmodel.LastName = user.LastName;

            return Ok(reportViewmodel);
        }
        [HttpPost, Route("getuserreport")]
        public IActionResult GetUserReportByMonth(ReportViewmodel reportViewmodel)
        {
            var reports = _reportService.GetReportsByUserId(reportViewmodel.UserId);
            DateTime currentMonthParsed = DateTime.Parse(reportViewmodel.CurrentMonth);
            var currentMonth = currentMonthParsed.ToString("yyyy-MM");
            foreach (var report in reports)
            {
                var reportDate = report.Date.ToString("yyyy-MM");
                if (reportDate == currentMonth)
                {
                    _reportService.GetReportById(report.Id);
                    var sortDeviations = report.DeviationItems.OrderByDescending(x => x.AbsenceDate);
                    report.DeviationItems = sortDeviations.ToList();
                    return Ok(report);
                }
            }
            return Ok(reportViewmodel);
        }

        [HttpPost, Route("addreport")]
        public IActionResult AddReport(ReportViewmodel reportViewmodel)
        {
            var report = _reportService.GetReportById(reportViewmodel.Id);
            if (report == null)
            {
                DateTime currentMonthParsed = DateTime.Parse(reportViewmodel.CurrentMonth);
                var currentMonth = currentMonthParsed.ToString("yyyy-MM");
                DateTime finalcurrentMonthParsed = DateTime.Parse(currentMonth);

                report = Mapper.ViewModelToModelMapping.ReportViewModelToReport(reportViewmodel);
                report.Date = finalcurrentMonthParsed;
                _reportService.Add(report);
                return Ok(report);
            }
            else
            {
                if (report == null)
                {
                    report = _reportService.GetReportById(reportViewmodel.Id);
                }
                foreach (var deviation in report.DeviationItems)
                {
                    _deviationService.Remove(deviation);
                }
                report.DeviationItems = reportViewmodel.DeviationItems;
                report.UpdatedDate = DateTime.Now;
                _reportService.Update(report);

                return Ok(report);
            }

        }
    }
}
