using Microsoft.EntityFrameworkCore;
using pucfarma.api.Models;


namespace pucfarma.api.Data
{
    public class PucFarmaDbContext : DbContext
    {
        public PucFarmaDbContext(DbContextOptions<PucFarmaDbContext> options) : base(options) { }

        public DbSet<UsuarioModel> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioModel>()
                .OwnsOne(e => e.enderecoEntrega, sa =>
                {
                    sa.Property(a => a.estado).IsRequired();
                    sa.Property(a => a.cidade).IsRequired();
                    sa.Property(a => a.bairro).IsRequired();
                    sa.Property(a => a.rua).IsRequired();
                    sa.Property(a => a.numero);
                    sa.Property(a => a.complemento);
                });
        }
     }

}