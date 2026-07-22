using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FirstWebApi.Filters
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            string path = Path.Combine(
                Directory.GetCurrentDirectory(),
                "ExceptionLog.txt");

            File.AppendAllText(
                path,
                context.Exception.ToString() + Environment.NewLine);

            context.Result = new ObjectResult("An internal server error occurred.")
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };

            context.ExceptionHandled = true;
        }
    }
}