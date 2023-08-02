using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedDoseController : ControllerBase
    {

        private readonly IMedDoseRepo _medDoseRepo;
        public MedDoseController(IMedDoseRepo medDoseRepo)
        {
            _medDoseRepo = medDoseRepo;
        }


        [HttpGet("GetByMedId")]
        public IActionResult GetByMedId(int medId)
        {
            List<MedicationDose> listOfDoses = _medDoseRepo.GetAllByMedId(medId);

            if (listOfDoses == null)
            {
                return NotFound();
            }
            return Ok(listOfDoses);
        }


        [HttpPost]
        public IActionResult MedDose(MedicationDose dose)
        {
            _medDoseRepo.Add(dose);
            return CreatedAtAction("GetByMedId", new { id = dose.Id }, dose);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, MedicationDose dose)
        {
            if (id != dose.Id)
            {
                return BadRequest();
            }
            _medDoseRepo.Update(dose);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _medDoseRepo.Delete(id);
            return NoContent();
        }




    }
}
