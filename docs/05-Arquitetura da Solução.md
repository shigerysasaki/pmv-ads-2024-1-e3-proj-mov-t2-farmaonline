# Arquitetura da Solução


![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

![Untitled diagram-2024-03-24-151143](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/130866846/bafb9cab-cd0e-42cc-aca8-f9cc790b0766)


## Modelo ER

<br>

![diagrama-er-farmacia drawio](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/89418479/2f31d6de-a143-462e-8764-c9d0811011de)

<br>

## Esquema Relacional

<br>

![esquema-relacional-farmacia (1)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/89418479/204b99d0-d604-40e8-9bc7-426a5355b093)

<br>

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

* IDEs de desenvolvimento: Visual Studio Code, node.JS, Visual Studio 2022 e React Native.
* Banco de dados: ???.
* Ferramenta de Diagramação: Lucidchart.
* Ferramenta de versionamento: Git.
* Ferramenta de Gestão de Projeto: Github Projects.
* Plataforma para hospedagem do Site: ???.


![Banco de dados](https://github.com/MatheusPucGit/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/128756585/c49e73fd-e6db-47c7-a2b0-f501a9b32a68)


* 1. O usuário abre o aplicativo em seu dispositivo movel
* 2. O aplicativo, exibe a interface do usuário, permitindo que ele navegue pelos elementos da interface, como botões, menus e formulários.
* 3. Quando o usuário realiza uma ação, como preencher um formulário e enviar dados, o aplicativo envia uma solicitação para o backend, onde o node.js processa os dados e realiza operações no banco de dados SQL, como armazenar informações do usuário ou recuperar dados relevantes.
* 4. Após o processamento no backend, o frontend recebe uma resposta do servidor. Por exemplo, se o usuário preencher um formulário de login corretamente, o backend pode retornar uma resposta confirmando o login bem-sucedido. Essa resposta é então exibida ao usuário na interface do aplicativo, redirecionando-o para a página inicial do aplicativo.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
