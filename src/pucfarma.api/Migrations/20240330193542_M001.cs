using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace pucfarma.api.Migrations
{
    /// <inheritdoc />
    public partial class M001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    usuarioId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nomeCompleto = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    telefone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    senha = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    enderecoEntrega_cep = table.Column<string>(type: "text", nullable: false),
                    enderecoEntrega_estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    enderecoEntrega_cidade = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    enderecoEntrega_bairro = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    enderecoEntrega_rua = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    enderecoEntrega_numero = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    enderecoEntrega_complemento = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.usuarioId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
