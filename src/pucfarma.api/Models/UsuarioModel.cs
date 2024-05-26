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
        public string? nomeCompleto { get; set; }

        [MaxLength(40)]
        [Display(Name = "E-mail")]
        public string email { get; set; }

        [MaxLength(50)]
        [Display(Name = "Telefone")]
        public string? telefone { get; set; }

        [MaxLength(100)]
        [Display(Name = "Senha")]
        public string senha { get; set; }

        [Display(Name = "Tipo de usuário")]
        public TipoUsuario tipoUsuario { get; set; }

        [Display(Name = "CEP")]
        public string? cep { get; set; }

        [MaxLength(20)]
        [Display(Name = "Estado")]
        public string? estado { get; set; }

        [MaxLength(30)]
        [Display(Name = "Cidade")]
        public string? cidade { get; set; }

        [MaxLength(30)]
        [Display(Name = "Bairro")]
        public string? bairro { get; set; }

        [MaxLength(30)]
        [Display(Name = "Rua")]
        public string? rua { get; set; }

        [MaxLength(10)]
        [Display(Name = "Número")]
        public string? numero { get; set; }

        [MaxLength(20)]
        [Display(Name = "Complemento")]
        public string? complemento { get; set; }

        public ICollection<PedidoModel>? usuarioPedido { get; set; }
        public ICollection<AvaliacaoModel>? usuarioAvaliacao { get; set; }
    }
}