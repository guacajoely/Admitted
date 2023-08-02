using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicationController : ControllerBase
    {

        private readonly IMedicationRepo _medicationRepo;
        public MedicationController(IMedicationRepo medicationRepo)
        {
            _medicationRepo = medicationRepo;
        }


        [HttpGet("GetByAdmissionId")]
        public IActionResult GetByAdmissionId(int admissionId)
        {
            List<Medication> meds = _medicationRepo.GetAllByAdmissionId(admissionId);

            if (meds == null)
            {
                return NotFound();
            }
            return Ok(meds);
        }


        [HttpPost]
        public IActionResult Medication(Medication medication)
        {
            _medicationRepo.Add(medication);
            return CreatedAtAction("GetByAdmissionId", new { id = medication.Id }, medication);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Medication medication)
        {
            if (id != medication.Id)
            {
                return BadRequest();
            }
            _medicationRepo.Update(medication);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _medicationRepo.Delete(id);
            return NoContent();
        }



    }
}
