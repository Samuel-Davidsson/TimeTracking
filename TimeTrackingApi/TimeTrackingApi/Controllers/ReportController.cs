using Data.DataContext;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
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
        private readonly TimeTrackingContext _context;
        public ReportController(IUserService userService, IReportService reportService, IDeviationService deviationService, TimeTrackingContext context)
        {
            _userService = userService;
            _reportService = reportService;
            _deviationService = deviationService;
            _context = context;
        }
        //ReportViewModelToArticle
        [HttpPost, Route("addreport")]
        public IActionResult AddReport(ReportViewmodel reportViewmodel)
        {
            var reports = _reportService.GetReportsByUserId(reportViewmodel.UserId);

            var report = _context.Reports.Where(x => x.Id == reportViewmodel.Id).Include(p => p.DeviationItems).SingleOrDefault();

            if (report == null)
            {
                DateTime currentMonthParsed = DateTime.Parse(reportViewmodel.CurrentMonth);
                var currentMonth = currentMonthParsed.ToString("yyyy-MM");
                DateTime finalcurrentMonthParsed = DateTime.Parse(currentMonth);
                report = new Report
                {
                    Id = reportViewmodel.Id,
                    UserId = reportViewmodel.UserId,
                    Accepted = reportViewmodel.Accepted,
                    Attest = reportViewmodel.Attest,
                    CreatedDate = DateTime.Now,
                    DeviationItems = reportViewmodel.DeviationItems,
                    UpdatedDate = DateTime.Now,
                    Date = finalcurrentMonthParsed
                };
                _reportService.Add(report);
                return Ok(report);
            }
            else
            {
                if (report == null)
                {
                    report = _context.Reports.Where(x => x.Id == report.Id).Include(p => p.DeviationItems).SingleOrDefault();
                }
                foreach (var deviation in report.DeviationItems)
                {
                    _context.Deviations.Remove(deviation);
                }
                report.DeviationItems = reportViewmodel.DeviationItems;
                report.UpdatedDate = DateTime.Now;
                _reportService.Update(report);

                return Ok(report);
            }

        }
    }
}
