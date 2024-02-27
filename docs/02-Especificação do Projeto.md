# Especificações do Projeto

O projeto visa criar uma plataforma mobile de e-commerce, proporcionando a aquisição de artigos farmacêuticos, artigos de conveniência e equipamentos médicos sem que haja necessidade de deslocamento do cliente.


## Personas

### Persona 1:
Maria, 35 anos, mãe ocupada.
Maria é uma mãe de dois filhos pequenos, com idades entre 4 e 7 anos.
Ela trabalha em período integral como gerente de vendas em uma empresa de médio porte.
Devido ao seu horário de trabalho agitado e suas responsabilidades familiares, Maria tem pouco tempo livre durante o dia.
Recentemente, ela foi diagnosticada com hipertensão e precisa tomar medicamentos regularmente.
Maria está em busca de uma maneira conveniente de comprar seus medicamentos sem precisar interromper sua rotina agitada ou fazer longas filas em farmácias.

### Persona 2:
Pedro, 26 anos, estudante universitário.
Pedro é um estudante universitário em seu último ano de Engenharia de Software.
Ele é um entusiasta da tecnologia e adora explorar novos aplicativos e soluções online.
Pedro mora sozinho em um apartamento próximo ao campus da universidade.
Recentemente, ele contraiu uma gripe e precisa de medicamentos para aliviar os sintomas.
Como Pedro está ocupado com os estudos e projetos da faculdade, ele procura uma maneira rápida e fácil de comprar seus remédios sem precisar sair de casa.


### Persona 3: 
José, 60 anos, aposentado
José é um aposentado que recentemente se mudou para uma cidadezinha no interior após décadas morando na capital.
Ele tem uma série de condições de saúde, incluindo pressão alta e diabetes, que exigem medicação regular.
José é bastante familiarizado com tecnologia, pois sempre teve interesse em aprender e acompanhar as novidades.
Ele não possui carro e depende do transporte público para se locomover, o que pode ser inconveniente, especialmente em dias de mau tempo.
José está interessado em encontrar uma maneira de comprar seus remédios de forma conveniente e segura, sem precisar enfrentar longas viagens até a farmácia mais próxima.


### Persona 4:
Luísa é uma empreendedora de 35 anos que possui uma pequena farmácia localizada em um bairro residencial tranquilo. Ela adquiriu a farmácia há três anos e desde então tem trabalhado arduamente para construir e manter uma boa reputação na comunidade. Como proprietária de uma pequena farmácia, Luísa desempenha várias funções, desde gerenciamento de estoque até atendimento ao cliente. Ela está constantemente procurando maneiras de melhorar sua farmácia e se destacar da concorrência, que inclui grandes redes de farmácias e serviços de entrega online.




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

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário crie uma conta | ALTA | 
|RF-002| Permitir que o usuário consiga efetivar compras  | ALTA |
|RF-003| Permitir que o usuário consiga cadastrar seu endereço | Media |
|RF-004| Permitir que o usuário pesquise produtos | ALTA |
|RF-005| Permitir que o usuário tenha um carrinho | ALTA |
|RF-006| Permitir que exista um usuário adiministrador | ALTA |
|RF-007| Permitir que exista uma forma de conferir a etapa do processamento do pedido| ALTA |
|RF-008| Permitir que exista uma barra de favoritos| BAIXA |
|RF-008| O sistema deve ter um sistema de feedback e avaliação de produtos para auxiliar os clientes na tomada de decisão | Média |
|RF-009| O sistema deve permitir que o usuario recupere sua senha | Média |



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | Alta | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| Deve rodar em IOS e Android | Alta | 
|RNF-004| O sistema deve garantir a consistência e atualização em tempo real do estoque de produtos disponíveis | Alta | 
|RNF-005| O sistema deve ser responsivo para se adaptar a diferentes dispositivos móveis. | Média | 


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

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
