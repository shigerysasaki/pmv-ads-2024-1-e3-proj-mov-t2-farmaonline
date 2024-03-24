# Especificações do Projeto

O projeto visa criar uma plataforma mobile de e-commerce, proporcionando a aquisição de artigos farmacêuticos, artigos de conveniência e equipamentos médicos sem que haja necessidade de deslocamento do cliente.


## Personas

![Pedro (1)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128405733/df5314d0-e22e-42fc-931d-2aab9d077cec)
![Jose](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128405733/cca38a70-8696-4dc0-893b-302c6fef0672)
![Maria](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128405733/141c237e-1055-4072-b28d-ab6ffea33432)
![Luisa](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128405733/7d58ce45-08f3-4a04-b300-22a104353c89)





## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Maria | Compras ágeis          | Não interromper sua rotina agitada             |
|Luísa       | Otimizar seu negocio               | Se destacar perante a concorrencia |
|José | Segurança e comodidade nas compras        | Dificuldade no deslocamento               |
|Pedro       |Facilidade na compra             | Não sair de casa |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.


## Modelagem do Processo de Negócio 

### Análise da Situação Atual
Compra em Farmácias Físicas:

A necessidade de os clientes se deslocarem até uma farmácia física para comprar medicamentos e produtos de saúde pode ser bastante inconveniente por várias razões como:

 1- Mobilidade Limitada: Para pessoas idosas, com deficiências físicas ou com mobilidade limitada, sair de casa e se deslocar até uma farmácia pode ser uma tarefa difícil e até mesmo impossível sem assistência adicional.
 <p> 2- Distância Geográfica: Em algumas áreas, as farmácias podem estar localizadas a uma distância considerável das residências dos clientes. Isso pode resultar em viagens demoradas e custosas, especialmente para aqueles que não têm acesso a transporte próprio.
<p> 3- Restrições de Tempo: Muitas pessoas têm agendas ocupadas, o que torna difícil encontrar tempo para visitar uma farmácia física durante o horário comercial. Isso pode levar a atrasos na obtenção de medicamentos essenciais ou produtos de saúde.
<p> 4- Fatores Climáticos: Em determinadas condições climáticas, como chuvas fortes, neve ou calor extremo, sair de casa para ir à farmácia pode ser desconfortável e até mesmo perigoso.
<p> 5- Riscos à Saúde: Especialmente durante pandemias ou surtos de doenças, como a gripe sazonal, ir a locais públicos como farmácias físicas pode aumentar o risco de exposição a germes e infecções.


### Descrição Geral da Proposta

O sistema irá se comportar como uma loja online em que os clientes poderam comprar os produtos após um cadastro de login e senha, em cada cadastro o cliente podera escolher o endereço de entrega do medicamento e tambem poderá acompanhar a etapa de entrega do seu produto.


### Processo 1 – Processo de Venda


![Captura de tela 2024-02-21 190124](https://github.com/shigerysasaki/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/4f2c9e20-6f12-4e37-b52a-7f3de41783c1)



## Indicadores de Desempenho

![Indicadores de desempenho (4)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128405733/c1871444-02b3-4916-9357-46c36c6ca39b)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário crie uma conta | ALTA |
|RF-002| O sistema deve conter autenticação de usuários | ALTA |
|RF-003| Permitir que o usuário consiga efetivar compras  | ALTA |
|RF-004| Permitir que o usuário consiga cadastrar seu endereço | Media |
|RF-005| Permitir que o usuário pesquise produtos | ALTA |
|RF-006| Permitir que o usuário tenha um carrinho | ALTA |
|RF-007| Permitir que exista um usuário adiministrador | ALTA |
|RF-008| Permitir que exista uma forma de conferir a etapa do processamento do pedido| ALTA |
|RF-009| Permitir que exista uma barra de favoritos| BAIXA |
|RF-0010| O sistema deve incorporar uma funcionalidade de feedback e avaliação de produtos | Média |
|RF-011| O sistema deve permitir que o usuario recupere sua senha | Média |



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | Alta | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| Deve rodar em IOS e Android | Alta | 
|RNF-004| O sistema deve garantir a consistência e atualização em tempo real do estoque de produtos disponíveis | Alta | 



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O uso do projeto para fins pessoais não é permitido.  |
|03| O projeto nao vai ser desenvolvido por terceiros   |

## Diagrama de Casos de Uso

![Diagrama de caso de uso](https://github.com/MatheusPucGit/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128756585/4580f6c9-8ed9-45d2-9164-80319e8679e0)


# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

![image](https://github.com/shigerysasaki/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/1f414b95-01eb-4168-8b6d-0d605de34efb)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo



![image](https://github.com/shigerysasaki/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/7ad1a58c-1681-4470-8181-036d673ab9aa) 

![image](https://github.com/shigerysasaki/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/7f72e6cb-1a9d-47dc-bf50-8ca8bdc55bf2)




## Gerenciamento de Equipe

![image](https://github.com/shigerysasaki/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/abf61d37-d0b1-40e2-9a61-95c3073e2818)


## Gestão de Orçamento

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/1bdd04f9-7066-4a28-a510-6a20b5d9a410)



