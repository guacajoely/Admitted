using Microsoft.AspNetCore.Mvc;
using Admitted.Models;
using Admitted.Repositories;

namespace Admitted.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly IUserRepository _userRepository;
        private readonly IUserRepo _userRepo;
        public UserController(IUserRepo userRepo)
        {
            //_userRepository = userRepository;
            _userRepo = userRepo;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepo.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepo.Add(user);
            return CreatedAtAction(
                "GetByEmail",
                new { email = user.Email },
                user);
        }
    }
}