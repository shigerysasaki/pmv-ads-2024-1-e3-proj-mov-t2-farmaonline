using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Models;

namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public AutenticacaoController(PucFarmaDbContext context)
        {
            _context = context;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UsuarioModel usuarioLogin)
        {
            if (string.IsNullOrWhiteSpace(usuarioLogin.email) || string.IsNullOrWhiteSpace(usuarioLogin.senha))
            {
                return BadRequest(new { message = "E-mail e senha são obrigatórios para o login." });
            }

            var dados = await _context.Usuarios
                .Where(u => u.email == usuarioLogin.email)
                .FirstOrDefaultAsync();

            bool senhaOK = BCrypt.Net.BCrypt.Verify(usuarioLogin.senha, dados.senha);

            if (senhaOK)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, dados.usuarioId.ToString()),
                    new Claim(ClaimTypes.Name, dados.nomeCompleto),
                    new Claim(ClaimTypes.Email, dados.email),
                };

                var userIdentity = new ClaimsIdentity(claims, "login");
                var principal = new ClaimsPrincipal(userIdentity);

                await HttpContext.SignInAsync(principal);

                return Ok(new { message = "Login bem-sucedido." });
            }
            return BadRequest(new { message = "Credenciais inválidas." });
        }


        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();

            return Ok(new { message = "Logout bem-sucedido." });
        }

        [HttpGet("UsuarioLogado")]
        public async Task<ActionResult<UsuarioModel>> GetIdUsuario()
        {
            var idUsuario = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var usuarioModel = await _context.Usuarios.FindAsync(idUsuario);

            if (usuarioModel == null)
            {
                return NotFound();
            }

            return usuarioModel;
        }
    }
}
