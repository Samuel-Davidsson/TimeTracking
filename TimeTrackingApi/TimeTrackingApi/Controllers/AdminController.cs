using System.Linq;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
            var users = _userService.GetAll().Where(x => x.Department == adminUser.Department && x.IsAdmin == false);
            // Bygga om skicka upp vymodeller istället med attest etc.. ta bort sånt som ej skall med.
            return Ok(users);
        }
    }
}