using Microsoft.AspNetCore.Mvc;
using FirstWebApi.Models;

namespace FirstWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private static List<Employee> employees = new List<Employee>
        {
            new Employee
            {
                Id = 1,
                Name = "John",
                Salary = 50000,
                Permanent = true,
                Department = new Department { Id = 1, Name = "IT" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 1, Name = "C#" },
                    new Skill { Id = 2, Name = "SQL" }
                },
                DateOfBirth = new DateTime(1998, 5, 20)
            },
            new Employee
            {
                Id = 2,
                Name = "Alice",
                Salary = 60000,
                Permanent = true,
                Department = new Department { Id = 2, Name = "HR" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 3, Name = "Communication" }
                },
                DateOfBirth = new DateTime(1997, 8, 15)
            }
        };

        [HttpGet]
        public ActionResult<List<Employee>> Get()
        {
            return Ok(employees);
        }

        [HttpPut("{id}")]
        public ActionResult<Employee> Put(int id, [FromBody] Employee employee)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid employee id");
            }

            var existingEmployee = employees.FirstOrDefault(e => e.Id == id);

            if (existingEmployee == null)
            {
                return BadRequest("Invalid employee id");
            }

            existingEmployee.Name = employee.Name;
            existingEmployee.Salary = employee.Salary;
            existingEmployee.Permanent = employee.Permanent;
            existingEmployee.Department = employee.Department;
            existingEmployee.Skills = employee.Skills;
            existingEmployee.DateOfBirth = employee.DateOfBirth;

            return Ok(existingEmployee);
        }
    }
}