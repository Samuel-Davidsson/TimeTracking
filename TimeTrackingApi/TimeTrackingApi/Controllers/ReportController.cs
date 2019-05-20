using Domain.Entities;
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
        private readonly GetReportFromMonth _getReportFromMonth;

        public ReportController(IUserService userService, IReportService reportService, IDeviationService deviationService, GetReportFromMonth getReportFromMonth)
        {
            _userService = userService;
            _reportService = reportService;
            _deviationService = deviationService;
            _getReportFromMonth = getReportFromMonth;
        }

        [HttpGet("{id}")]
        public IActionResult GetReportById(int id)
        {
            var report = _reportService.GetReportById(id);
            var user = _userService.GetUserById(report.UserId);
            var reportViewmodel = Mapper.ModelToViewModelMapping.ReportViewmodel(report);
            reportViewmodel.FirstName = user.FirstName;
            reportViewmodel.LastName = user.LastName;
            reportViewmodel.DeviationItems = report.DeviationItems.OrderByDescending(x =>x.AbsenceDate).ToArray();
            return Ok(reportViewmodel);
        }
        [HttpPost, Route("getuserreport")]
        public IActionResult GetUserReportByMonth(ReportViewmodel reportViewmodel)
        {
            var reports = _reportService.GetReportsByUserId(reportViewmodel.UserId).ToArray();

            var report = _getReportFromMonth.GetReportByMonth(reportViewmodel, reports, _reportService);

            return Ok(report);       
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
                reportViewmodel.Date = finalcurrentMonthParsed;
                report = Mapper.ViewModelToModelMapping.ReportViewModelToReport(reportViewmodel);
                //report.Date = finalcurrentMonthParsed;
                _reportService.Add(report);
                return Ok(report);
            }
            else
            {
                //if (report == null)
                //{
                //    report = _reportService.GetReportById(reportViewmodel.Id);
                //}
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
