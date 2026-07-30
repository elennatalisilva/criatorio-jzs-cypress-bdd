# language: pt

Funcionalidade: Módulo de Lançamentos e Validações de Formulário - Criatório JZS

  Contexto:
    Dado que acesso o sistema criatório JZS

  Cenário: CT-001 - Validar campos obrigatórios
    Então sistema deve exibir campos obrigatórios com asterisco

  Cenário: CT-002 - Validar que sistema salva com sucesso
    E preencho os campos obrigatórios
    E clico em "Salvar registro"
    Então sistema salva cadastro com sucesso

  Cenário: CT-003 - Validar que sistema aceita formato PNG
    E preencho o campo "Foto" com formato PNG
    E preencho os campos obrigatórios
    E clico em "Salvar registro"
    Então sistema salva cadastro com sucesso

  Cenário: CT-004 - Validar alerta de duplicidade de anilha
    E preencho o campo "Código da Anilha" com um código já cadastrado no sistema
    E preencho os campos obrigatórios
    E clico em "Salvar registro"
    Então o sistema deve exibir um alerta de confirmação sobre a duplicidade de anilha ao usuário

  Cenário: CT-005 - Validar que campos "Nome comum" e "nome científico" retornam preenchidos por padrão
    Então campos "Nome comum" e "nome científico" retornam preenchidos

  Cenário: CT-006 - Validar tentativa de salvar sem preencher campo obrigatório ("Código da Anilha")
    E deixo o campo "Código da Anilha" em branco
    E clico em "Salvar registro"
    Então o sistema exibe mensagem de alerta/erro informando que o campo é obrigatório e não salva o registro

  Cenário: CT-007 - Validar seleção de Sexo (Macho, Fêmea, Indefenido)
    E seleciono o sexo "Fêmea"
    E preencho os campos obrigatórios
    E clico em "Salvar registro"
    Então o registro é salvo com o sexo correspondente selecionado

  Cenário: CT-008 - Validar que o campo "Nascimento" corrige automaticamente meses maiores que 12 para o limite 12
    Quando digito 13 no campo correspondente ao mês
    Então o sistema deve ajustar automaticamente o valor do mês para 12

  Cenário: CT-009 - Validar que o campo "Nascimento" não permite dias acima de 31 e ajusta a entrada do usuário
    Quando tento digitar 40 no campo correspondente ao dia
    Então o campo ajusta o valor digitado para um dia válido

  Cenário: CT-010 - Validar que o sistema aceita data no futuro respeitando o limite de 4 dígitos para o ano
    Quando preencho a data com dia válido, mês válido e ano futuro com 4 dígitos
    Então o campo exibe a data corretamente com o ano de 4 dígitos

  Cenário: CT-011 - Validar alteração de Status (Ativo, Doado, Falecido, Fugiu)
    E seleciono o status "Fugiu"
    E preencho os campos obrigatórios
    E clico em "Salvar registro"
    Então o registro é salvo com o status "Fugiu"

  Cenário: CT-012 - Validar expansão da Árvore Genealógica Avançada
    E clico em "+ ABRIR CADASTRO DE ÁRVORE AVANÇADA (AVÓS, BISAVÓS E TATARAVÓS)"
    Então o formulário deve expandir exibindo os campos adicionais de parentesco