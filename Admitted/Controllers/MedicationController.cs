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


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_medicationRepo.GetAll());
        }


        [HttpGet("{admissionId}")]
        public IActionResult GetByAdmissionId(int admissionId)
        {
            List<Medication> listOfMeds = _medicationRepo.GetAllByAdmissionId(admissionId);

            if (listOfMeds == null)
            {
                return NotFound();
            }
            return Ok(listOfMeds);
        }


        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            Medication singleMed = _medicationRepo.GetMedById(id);
            if (singleMed == null)
            {
                return NotFound();
            }
            return Ok(singleMed);
        }


        [HttpPost]
        public IActionResult Medication(Medication medication)
        {
            _medicationRepo.Add(medication);
            return CreatedAtAction("Get", new { id = medication.Id }, medication);
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