using pucfarma.api.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pucfarma.api.Models
{
    [Table("Pedido_Produto")]
    public class PedidoProdutoModel
    {
        [Key]
        public int pedidoProdutoId { get; set; }

        public int pedidoId { get; set; }
        [ForeignKey("pedidoId")]
        [Display(Name = "Pedido")]
        public PedidoModel? pedido { get; set; }

        public int produtoId { get; set; }
        [ForeignKey("produtoId")]
        [Display(Name = "Produto")]
        public ProdutoModel? produto { get; set; }

        [Display(Name = "Quantidade")]
        public int quantidade { get; set; }
    }
}
