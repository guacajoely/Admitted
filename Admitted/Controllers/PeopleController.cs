using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private readonly IPeopleRepo _peopleRepo;
        public PeopleController(IPeopleRepo peopleRepo)
        {
            _peopleRepo = peopleRepo;
        }


        [HttpGet("GetByAdmissionId")]
        public IActionResult GetByAdmissionId(int admissionId)
        {
            List<People> people = _peopleRepo.GetAllByAdmissionId(admissionId);

            if (people == null)
            {
                return NotFound();
            }
            return Ok(people);
        }


        [HttpPost]
        public IActionResult People(People person)
        {
            _peopleRepo.Add(person);
            return CreatedAtAction("GetByAdmissionId", new { id = person.Id }, person);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, People person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }
            _peopleRepo.Update(person);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _peopleRepo.Delete(id);
            return NoContent();
        }





    }
}
