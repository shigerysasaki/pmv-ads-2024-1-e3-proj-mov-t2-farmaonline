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
    public class CadastroController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public CadastroController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // GET: api/Cadastro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioModel>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Cadastro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioModel>> GetUsuario(int id)
        {
            var usuarioModel = await _context.Usuarios.FindAsync(id);

            if (usuarioModel == null)
            {
                return NotFound();
            }

            return usuarioModel;
        }

        // PUT: api/Cadastro/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarUsuario(int id, UsuarioModel usuarioModel)
        {
            if (id != usuarioModel.usuarioId)
            {
                return BadRequest();
            }

            var existingEmail = _context.Usuarios.FirstOrDefault(u => u.email == usuarioModel.email && u.usuarioId != id);

            if (existingEmail != null)
            {
                return BadRequest(new { erro = "O e-mail fornecido já está em uso." });
            }

            usuarioModel.senha = BCrypt.Net.BCrypt.HashPassword(usuarioModel.senha);
            _context.Entry(usuarioModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cadastro
        [HttpPost]
        public async Task<ActionResult<UsuarioModel>> CriarUsuario(UsuarioModel usuarioModel)
        {
            var existingEmail = _context.Usuarios.FirstOrDefault(u => u.email == usuarioModel.email);

            if (existingEmail != null)
            {
                return BadRequest(new { erro = "O e-mail fornecido já está em uso." });
            }

            if (usuarioModel.senha == null || usuarioModel.senha.Length < 8 || usuarioModel.senha.Length > 14)
            {
                return BadRequest(new { erro = "A senha fornecida deve ter entre 8 e 14 caracteres." });
            }

            if (ModelState.IsValid)
            {
                int maiorId = await _context.Usuarios.MaxAsync(u => (int?)u.usuarioId) ?? 0;
                usuarioModel.usuarioId = maiorId + 1;



                usuarioModel.senha = BCrypt.Net.BCrypt.HashPassword(usuarioModel.senha);
                _context.Usuarios.Add(usuarioModel);
                await _context.SaveChangesAsync();
            }
            else
            {
                return BadRequest(new { erro = "Os campos não foram preenchidos corretamente." });
            }


            return CreatedAtAction("GetUsuario", new { id = usuarioModel.usuarioId }, usuarioModel);
        }

        // DELETE: api/Cadastro/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ApagarUsuario(int id)
        {
            var usuarioModel = await _context.Usuarios.FindAsync(id);
            if (usuarioModel == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuarioModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioModelExists(int id)
        {
            return _context.Usuarios.Any(e => e.usuarioId == id);
        }
    }
}
