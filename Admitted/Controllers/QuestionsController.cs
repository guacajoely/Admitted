﻿using Admitted.Models;
using Admitted.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {

        private readonly IQuestionsRepo _questionsRepo;
        public QuestionsController(IQuestionsRepo questionsRepo)
        {
            _questionsRepo = questionsRepo;
        }


        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_questionsRepo.GetAll());
        }


        [HttpGet("{admissionId}")]
        public IActionResult GetByAdmissionId(int admissionId)
        {
            List<Questions> listOfQuestions = _questionsRepo.GetAllByAdmissionId(admissionId);

            if (listOfQuestions == null)
            {
                return NotFound();
            }
            return Ok(listOfQuestions);
        }


        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            Questions question = _questionsRepo.GetQuestionById(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }


        [HttpPost]
        public IActionResult Questions(Questions question)
        {
            _questionsRepo.Add(question);
            return CreatedAtAction("Get", new { id = question.Id }, question);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Questions question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }
            _questionsRepo.Update(question);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _questionsRepo.Delete(id);
            return NoContent();
        }



    }
}
