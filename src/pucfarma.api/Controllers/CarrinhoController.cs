using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Models;

namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public ProdutosController(PucFarmaDbContext context)
        {
            _context = context;
        }

        private List<ProdutoModel> carrinho = new List<ProdutoModel>();

        [HttpPost("Carrinho/Adicionar")]
        public async Task<ActionResult> AdicionarProduto([FromBody] ProdutoModel produto)
        {
            // Verifique se o produto já está no carrinho
            var produtoCarrinho = carrinho.FirstOrDefault(p => p.produtoId == produto.produtoId);

            if (produtoCarrinho != null)
            {
                // Atualize a quantidade do produto existente
                produtoCarrinho.estoqueDisponivel += produto.estoqueDisponivel;
            }
            else
            {
                // Adicione o novo produto ao carrinho
                carrinho.Add(produto);
            }

            // Retorne um resultado indicando o sucesso da operação
            return Ok();
        }

        [HttpGet("Carrinho/Lista")]
        public async Task<ActionResult<IEnumerable<ProdutoModel>>> GetProdutosCarrinho()
        {
            // Retorne os itens do carrinho
            return carrinho;
        }

        [HttpDelete("Carrinho/Remover/{id}")]
        public async Task<ActionResult> RemoverProduto(int id)
        {
            // Remova o produto do carrinho pelo ID
            carrinho.RemoveAll(p => p.produtoId == id);

            // Retorne um resultado indicando o sucesso da operação
            return Ok();
        }


    }
}
