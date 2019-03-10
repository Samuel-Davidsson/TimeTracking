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
        // Fixa Authorize här check mot token.

        [HttpPost, Route("addreport")]
        public IActionResult AddReport(ReportViewmodel reportViewmodel)
        {
            if (reportViewmodel.Id == 0)
            {
                var report = new Report
                {
                    Id = reportViewmodel.Id,
                    UserId = reportViewmodel.UserId,
                    Accepted = reportViewmodel.Accepted,
                    Attest = reportViewmodel.Attest,
                    CreatedDate = DateTime.Now,
                    DeviationItems = reportViewmodel.DeviationItems,
                    UpdatedDate = DateTime.Now,
                };
                _reportService.Add(report);
                return Ok(report);

            }
            else
            {
                return Ok("Update");
            }
           }
        }
    }
