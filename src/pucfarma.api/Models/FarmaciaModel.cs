using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pucfarma.api.Models
{
    [Table("Farmacia")]
    public class FarmaciaModel
    {
        [Key]
        public string nomeFarmacia { get; set; }

        [Display(Name = "Telefone")]
        public string telefone { get; set; }

        [Display(Name = "Horário de funcionamento")]
        public string horarioFuncionamento { get; set; }

        [Display(Name = "Endereço")]
        public Endereco enderecoFarmacia { get; set; }


        public ICollection<ProdutoModel>? farmaciaProduto { get; set; }
    }
}
