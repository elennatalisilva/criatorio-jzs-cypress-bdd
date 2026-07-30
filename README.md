# 🦅 Automação de Testes BDD - Criatório JZS

Projeto de automação de testes end-to-end (E2E) desenvolvido em **Cypress** utilizando a abordagem **BDD (Behavior Driven Development)** com **Cucumber (Gherkin)** em Português. O objetivo é validar o módulo de Lançamentos e Validações de Formulário do sistema Criatório JZS.

---

## 🛠️ Tecnologias Utilizadas

* **JavaScript / Node.js**
* **Cypress** (Framework de Testes E2E)
* **@badeball/cypress-cucumber-preprocessor** (Integração BDD/Gherkin)

---

## 📋 Casos de Teste Automatizados (CT-001 a CT-012)

* **CT-001:** Validar campos obrigatórios com asterisco.
* **CT-002:** Validar que o sistema salva com sucesso.
* **CT-003:** Validar aceitação de formato de imagem PNG.
* **CT-004:** Validar alerta de duplicidade de anilha.
* **CT-005:** Validar preenchimento automático padrão para "Nome comum" e "nome científico".
* **CT-006:** Validar tentativa de salvar sem preencher campo obrigatório.
* **CT-007:** Validar seleção de Sexo (Macho, Fêmea, Indefinido).
* **CT-008:** Validar correção automática do mês (>12 ajustado para 12).
* **CT-009:** Validar limite de dias no campo Nascimento (máximo 31).
* **CT-010:** Validar aceitação de data no futuro com limite de 4 dígitos para o ano.
* **CT-011:** Validar alteração de Status (Ativo, Doado, Falecido, Fugiu).
* **CT-012:** Validar expansão da Árvore Genealógica Avançada.

---

## ⚙️ Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/elennatalisilva/criatorio-jzs-cypress-bdd.git](https://github.com/elennatalisilva/criatorio-jzs-cypress-bdd.git)
   cd criatorio-jzs-cypress-bdd
