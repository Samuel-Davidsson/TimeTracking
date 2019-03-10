using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}