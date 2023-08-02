using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {

        private readonly IAdmissionRepo _admissionRepo;
        public AdmissionController(IAdmissionRepo admissionRepo)
        {
            _admissionRepo = admissionRepo;
        }


        [HttpGet("GetByUserId")]
        public IActionResult GetByUserId(int userId)
        {
            var admission = _admissionRepo.GetByUserId(userId);

            if (userId == null || admission == null)
            {
                return NotFound();
            }
            return Ok(admission);
        }


        [HttpPost]
        public IActionResult Admission(Admission admission)
        {
            _admissionRepo.Add(admission);
            return CreatedAtAction("GetByUserId", new { id = admission.Id }, admission);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Admission admission)
        {
            if (id != admission.Id)
            {
                return BadRequest();
            }
            _admissionRepo.Update(admission);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _admissionRepo.Delete(id);
            return NoContent();
        }



    }
}
