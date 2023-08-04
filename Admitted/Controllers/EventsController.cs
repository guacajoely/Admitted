using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {

        private readonly IEventsRepo _eventsRepo;
        public EventsController(IEventsRepo eventsRepo)
        {
            _eventsRepo = eventsRepo;
        }


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_eventsRepo.GetAll());
        }


        [HttpGet("{admissionId}")]
        public IActionResult GetByAdmissionId(int admissionId)
        {
            List<Events> listOfEvents = _eventsRepo.GetAllByAdmissionId(admissionId);

            if (listOfEvents == null)
            {
                return NotFound();
            }
            return Ok(listOfEvents);
        }


        [HttpPost]
        public IActionResult Events(Events events)
        {
            _eventsRepo.Add(events);
            return CreatedAtAction("Get", new { id = events.Id }, events);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Events events)
        {
            if (id != events.Id)
            {
                return BadRequest();
            }
            _eventsRepo.Update(events);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _eventsRepo.Delete(id);
            return NoContent();
        }



    }
}