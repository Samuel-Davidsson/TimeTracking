using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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

        // Adda mapping här istället.

        [HttpPost, Route("addreport")]
        public IActionResult AddReport(ReportViewmodel reportViewmodel)
        {
            if (reportViewmodel.Id == 0)
            {
                DateTime currentMonthParsed = DateTime.Parse(reportViewmodel.CurrentMonth);
                var currentMonth = currentMonthParsed.ToString("yyyy-MM");
                DateTime finalcurrentMonthParsed = DateTime.Parse(currentMonth);
                var report = new Report
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
            // Fixa till uppdatera rapport om den redan finns.
            else
            {
                return Ok("Update");
            }
           }
        }
    }
