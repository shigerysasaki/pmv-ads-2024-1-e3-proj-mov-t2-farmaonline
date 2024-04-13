using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Models;

namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public ProdutoController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // GET: api/Produto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoModel>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        // GET: api/Produto
        [HttpGet("Oferta")]
        public async Task<ActionResult<IEnumerable<ProdutoModel>>> GetProdutosOferta()
        {
            var produtosOferta = await _context.Produtos
                .Where(p => p.porcentagemDesconto != 0)
                .ToListAsync();

            return produtosOferta;
        }

        // GET: api/Produto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoModel>> GetProduto(int id)
        {
            var produtoModel = await _context.Produtos.FindAsync(id);

            if (produtoModel == null)
            {
                return NotFound();
            }

            return produtoModel;
        }

        // PUT: api/Produto/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarProduto(int id, ProdutoModel produtoModel)
        {
            if (id != produtoModel.produtoId)
            {
                return BadRequest();
            }

            _context.Entry(produtoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(id))
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

        // POST: api/Produto
        [HttpPost]
        public async Task<ActionResult<ProdutoModel>> AdicionarProduto(ProdutoModel produtoModel)
        {
            _context.Produtos.Add(produtoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduto", new { id = produtoModel.produtoId }, produtoModel);
        }

        // DELETE: api/Produto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ApagarProduto(int id)
        {
            var produtoModel = await _context.Produtos.FindAsync(id);
            if (produtoModel == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(produtoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.produtoId == id);
        }
    }
}
