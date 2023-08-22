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


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_admissionRepo.GetAll()); 
        }

        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            Admission admission = _admissionRepo.GetAdmissionById(id);
            if (admission == null)
            {
                return NotFound();
            }
            return Ok(admission);
        }


        [HttpGet("{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            var admission = _admissionRepo.GetByUserId(userId);

            if (userId == null || admission == null)
            {
                return NotFound();
            }
            return Ok(admission);
        }

        [HttpGet("GetInactives/{userId}")]
        public IActionResult GetInactiveByUserId(int userId)
        {
            List<Admission> admissions = _admissionRepo.GetInactiveByUserId(userId);

            if (userId == null || admissions == null)
            {
                return NotFound();
            }
            return Ok(admissions);
        }

        //DOES SAME AS GetByUserId BUT JUST RETURNS TRUE/FALSE
        //USED TO CHECK BEFORE ATTEMPTING TO DISPLAY
        [HttpGet("CheckActives/{userId}")]
        public IActionResult GetActiveBool(int userId)
        {
            var admission = _admissionRepo.GetByUserId(userId);

            if (admission == null)
            {
                return Ok(false);
            }
            return Ok(true);
        }


        //DOES SAME AS GetInactiveByUserId BUT JUST RETURNS TRUE/FALSE
        //USED IN HEADER TO DISPLAY LINK TO 'HISTORY' OR NOT
        [HttpGet("CheckInactives/{userId}")]
        public IActionResult GetInactiveBool(int userId)
        {
            List<Admission> admissions = _admissionRepo.GetInactiveByUserId(userId);

            if (admissions.Count == 0)
            {
                return Ok(false);
            }
            return Ok(true);
        }


        [HttpPost]
        public IActionResult Admission(Admission admission)
        {
            _admissionRepo.Add(admission);
            return CreatedAtAction("Get", new { id = admission.Id }, admission);
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
