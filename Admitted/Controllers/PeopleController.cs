using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Mvc;

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


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_peopleRepo.GetAll());
        }


        [HttpGet("{admissionId}")]
        public IActionResult GetByAdmissionId(int admissionId)
        {
            List<People> listOfPeople = _peopleRepo.GetAllByAdmissionId(admissionId);

            if (listOfPeople == null)
            {
                return NotFound();
            }
            return Ok(listOfPeople);
        }


        [HttpPost]
        public IActionResult People(People person)
        {
            _peopleRepo.Add(person);
            return CreatedAtAction("Get", new { id = person.Id }, person);
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