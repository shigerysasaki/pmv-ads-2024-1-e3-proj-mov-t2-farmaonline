using pucfarma.api.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pucfarma.api.Models
{
    [Table("Usuarios")]
    public class UsuarioModel
    {
        [Key]
        public int usuarioId { get; set; }

        [MaxLength(50)]
        [Display(Name = "Nome completo")]
        public string nomeCompleto { get; set; }

        [MaxLength(40)]
        [Display(Name = "E-mail")]
        public string email { get; set; }

        [MaxLength(50)]
        [Display(Name = "Telefone")]
        public string telefone { get; set; }

        [MaxLength(100)]
        [Display(Name = "Senha")]
        public string senha { get; set; }

        [Display(Name = "Endereço")]
        public Endereco? enderecoEntrega { get; set; }

        [Display(Name = "Tipo de usuário")]
        public TipoUsuario tipoUsuario { get; set; }


        public ICollection<PedidoModel>? usuarioPedido { get; set; }
        public ICollection<AvaliacaoModel>? usuarioAvaliacao { get; set; }
    }
}