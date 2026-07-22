using Microsoft.AspNetCore.Mvc;

namespace FirstWebApi.Controllers
{
    [ApiController]
    [Route("api/Emp")]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var employees = new[]
            {
                new { Id = 1, Name = "John", Department = "IT" },
                new { Id = 2, Name = "Alice", Department = "HR" },
                new { Id = 3, Name = "Bob", Department = "Finance" }
            };

            return Ok(employees);
        }
    }
}