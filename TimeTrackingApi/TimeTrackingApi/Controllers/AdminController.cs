using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using TimeTrackingApi.Services;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IReportService _reportService;
        public AdminController(IUserService userService, IReportService reportService)
        {
            _userService = userService;
            _reportService = reportService;
        }
        [HttpGet("{id}")]
        public IActionResult GetUsersByAdminId(int id)
        {
            var adminUser = _userService.GetUserById(id);
            var users = _userService.GetAll().Where(x => x.Department == adminUser.Department && x.IsAdmin == false);

            var date = DateTime.Now.ToString("yyyy-MM");
            var userViewModels = new List<UserViewmodelList>();
            foreach (var user in users)
            {
                var userViewmodel = Mapper.ModelToViewModelMapping.UserViewmodelList(user);

                var reports = _reportService.GetReportsByUserId(user.Id).Where(x => x.Date.ToString("yyyy-MM") == date);
                var attest = false;
                foreach (var report in reports)
                {
                    attest = report.Attest;
                }
                userViewmodel.Attest = attest;
                userViewModels.Add(userViewmodel);
            }
            return Ok(userViewModels);
        }
    }
}