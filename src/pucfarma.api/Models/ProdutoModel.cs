using pucfarma.api.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pucfarma.api.Models
{
    [Table("Produtos")]
    public class ProdutoModel
    {
        [Key]
        public int produtoId { get; set; }

        public string nomeFarmacia { get; set; }
        [ForeignKey("nomeFarmacia")]
        [Display(Name = "Farmacia")]
        public FarmaciaModel? farmacia { get; set; }

        [MaxLength(50)]
        [Display(Name = "Nome do Produto")]
        public string nomeProduto { get; set; }

        [Display(Name = "Preço")]
        public decimal preco { get; set; }

        [Display(Name = "Descrição do Produto")]
        public string descricao { get; set; }

        [Display(Name = "Quantidade em Estoque")]
        public int estoqueDisponivel { get; set; }

        [Display(Name = "Categoria do Produto")]
        public CategoriaProduto categoria { get; set; }

        [Display(Name = "Desconto")]
        public int porcentagemDesconto { get; set; }


        public ICollection<PedidoProdutoModel>? produtoPedido { get; set; }
        public ICollection<AvaliacaoModel>? produtoAvaliacao { get; set; }
    }
}
