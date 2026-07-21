using Microsoft.AspNetCore.Mvc;

namespace FirstWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new string[] { "value1", "value2" });
        }

        [HttpPost]
        public IActionResult Post()
        {
            return Ok("POST Success");
        }

        [HttpPut]
        public IActionResult Put()
        {
            return Ok("PUT Success");
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            return Ok("DELETE Success");
        }
    }
}