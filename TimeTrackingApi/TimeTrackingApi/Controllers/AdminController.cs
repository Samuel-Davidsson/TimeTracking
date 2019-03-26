using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        public AdminController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("{id}")]
        public IActionResult GetUsersByAdminId(int id)
        {
            var adminUser = _userService.GetUserById(id);
            var users = _userService.GetAll().Where(x => x.Department == adminUser.Department);/* && x.IsAdmin == false);*/ //Add this later
            return Ok(users);
        }
    }
}