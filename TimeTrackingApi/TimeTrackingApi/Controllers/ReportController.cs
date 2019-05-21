using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using TimeTrackingApi.Helpers;
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
        private readonly ReportControllerServices _reportControllerServices;

        public ReportController(IUserService userService, IReportService reportService, IDeviationService deviationService, 
            ReportControllerServices reportControllerServices)
        {
            _userService = userService;
            _reportService = reportService;
            _deviationService = deviationService;
            _reportControllerServices = reportControllerServices;
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

            var report = _reportControllerServices.GetReportByMonth(reportViewmodel, reports, _reportService);

            return Ok(report);       
        }

        [HttpPost, Route("addreport")]
        public IActionResult AddReport(ReportViewmodel reportViewmodel)
        {
            var report = _reportService.GetReportById(reportViewmodel.Id);
            if (report == null)
            {
                reportViewmodel.Date = _reportControllerServices.DateParser(reportViewmodel.CurrentMonth);
                report = Mapper.ViewModelToModelMapping.ReportViewModelToReport(reportViewmodel);
                _reportService.Add(report);
                return Ok(report);
            }
            else
            {
                var updatedReport = _reportControllerServices.UpdateReportDeviations(report, _deviationService, reportViewmodel);
                _reportService.Update(updatedReport);
                return Ok(updatedReport);
            }

        }
    }
}
