using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FirstWebApi.Models;
using FirstWebApi.Filters;

namespace FirstWebApi.Controllers
{
    [ApiController]
[Route("api/[controller]")]
//[CustomAuthFilter]
public class EmployeeController : ControllerBase
    {
        private List<Employee> employees;

        public EmployeeController()
        {
            employees = GetStandardEmployeeList();
        }

        private List<Employee> GetStandardEmployeeList()
        {
            return new List<Employee>
            {
                new Employee
                {
                    Id = 1,
                    Name = "John",
                    Salary = 50000,
                    Permanent = true,
                    Department = new Department
                    {
                        Id = 1,
                        Name = "IT"
                    },
                    Skills = new List<Skill>
                    {
                        new Skill { Id = 1, Name = "C#" },
                        new Skill { Id = 2, Name = "ASP.NET Core" }
                    },
                    DateOfBirth = new DateTime(1998, 5, 10)
                },
                new Employee
                {
                    Id = 2,
                    Name = "Alice",
                    Salary = 45000,
                    Permanent = false,
                    Department = new Department
                    {
                        Id = 2,
                        Name = "HR"
                    },
                    Skills = new List<Skill>
                    {
                        new Skill { Id = 3, Name = "Communication" }
                    },
                    DateOfBirth = new DateTime(1999, 8, 15)
                }
            };
        }

        [AllowAnonymous]
[HttpGet]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status500InternalServerError)]
public ActionResult<List<Employee>> GetStandard()
{
    throw new Exception("Testing Exception Filter");
}

        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            employees.Add(employee);
            return Ok(employee);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Employee employee)
        {
            return Ok(employee);
        }
    }
}