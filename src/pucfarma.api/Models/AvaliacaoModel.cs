using pucfarma.api.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pucfarma.api.Models
{
    [Table("Avaliacoes")]
    public class AvaliacaoModel
    {
        [Key]
        public int avaliacaoId { get; set; }

        public int usuarioId { get; set; }
        [ForeignKey("usuarioId")]
        [Display(Name = "Usuário")]
        public UsuarioModel? usuario { get; set; }

        public int produtoId { get; set; }
        [ForeignKey("produtoId")]
        [Display(Name = "Produto")]
        public ProdutoModel? produto { get; set; }

        [Display(Name = "Nota")]
        public int nota { get; set; }

        [MaxLength(200)]
        [Display(Name = "Comentário")]
        public string comentario { get; set; }

        [Display(Name = "Data da avaliação")]
        public DateTime dataAvaliacao { get; set; }
    }
}
