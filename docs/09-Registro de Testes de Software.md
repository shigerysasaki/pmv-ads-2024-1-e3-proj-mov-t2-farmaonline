# Registro de Testes de Software

O presente relatório documenta os testes realizados no software durante o período de desenvolvimento, destacando os erros encontrados, suas causas e soluções correspondentes. Além disso, são apresentados os casos de teste aceitos que passaram com sucesso.

## Avaliação

### Etapa - 1

#### Erros Encontrados
- Erro de rota não definida:

  Descrição: Tentativa de navegar para uma rota não definida no navegador.
  Causa: Nome da rota não correspondente ao definido no navegador.
  Solução: Verificar se o nome da rota está correto e corresponde exatamente ao nome definido no navegador.
  
- Erro de largura não suportada pelo módulo de animação nativa:

  Descrição: Tentativa de animar uma propriedade não suportada pelo módulo de animação nativa.
  Causa: Tentativa de animar propriedades não suportadas pelo módulo de animação nativa, como largura.
  Solução: Evitar animar propriedades não suportadas pelo módulo de animação nativa.
  
- Erro ao tentar adicionar mais uma tela ao navegador:

  Descrição: Tentativa de adicionar uma nova tela ao navegador, mas o nome da tela não corresponde a uma tela existente.
  Causa: Nome da tela incorreto ao adicionar uma nova tela ao navegador.
  Solução: Certificar-se de usar o nome correto da tela ao adicionar uma nova tela ao navegador.

- Erro de navegação não tratada:

  Descrição: Tentativa de navegar para uma tela não definida no navegador.
  Causa: Nome da tela não correspondente ao definido no navegador.
  Solução: Verificar se o nome da tela está correto e corresponde exatamente ao nome definido no navegador.

  ### Casos de Teste Aceitos


- Teste de Navegação Básica:

  Descrição: Verificação da capacidade do aplicativo de navegar entre telas.
  Resultado: Todos os casos de teste passaram com sucesso, confirmando a funcionalidade de navegação do aplicativo.
  Teste de Animação Responsiva:

  Descrição: Verificação da capacidade do aplicativo de realizar animações de forma responsiva.
  Resultado: Casos de teste falharam devido a propriedades de animação não suportadas. Solução aplicada com sucesso.

#### Conclusão
Os testes realizados no software identificaram vários erros comuns, como problemas de navegação, propriedades de animação não suportadas e nomes de telas incorretos. No entanto, esses erros foram abordados com sucesso com as soluções correspondentes aplicadas. Além disso, os casos de teste aceitos confirmaram a funcionalidade esperada do aplicativo, garantindo uma experiência de usuário consistente e sem problemas.


[Screen_recording_20240407_165140.webm](https://github.com/shigerysasaki/pmv-ads-2024-1-e3-proj-mov-t2-farmaonline/assets/126729120/2b73d4df-db3f-4edf-bdc7-a924219b0c3b)

