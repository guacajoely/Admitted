﻿using Admitted.Models;
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


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_medDoseRepo.GetAll());
        }


        [HttpGet("{medId}")]
        public IActionResult GetByMedId(int medId)
        {
            List<MedicationDose> listOfDoses = _medDoseRepo.GetAllByMedId(medId);

            if (listOfDoses == null)
            {
                return NotFound();
            }
            return Ok(listOfDoses);
        }


        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            MedicationDose dose = _medDoseRepo.GetDoseById(id);
            if (dose == null)
            {
                return NotFound();
            }
            return Ok(dose);
        }


        [HttpPost]
        public IActionResult MedDose(MedicationDose dose)
        {
            _medDoseRepo.Add(dose);
            return CreatedAtAction("Get", new { id = dose.Id }, dose);
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
