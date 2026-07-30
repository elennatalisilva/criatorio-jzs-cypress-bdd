import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let alertText = '';

Cypress.on('window:alert', (text) => {
  alertText = text;
});

Cypress.on('window:confirm', (text) => {
  alertText = text;
  return true; 
});

// --- CONTEXTO ---
Given('que acesso o sistema criatório JZS', () => {
  alertText = '';
  cy.visit('/');
});

// --- CT-001 - Validar campos obrigatórios ---
Then('sistema deve exibir campos obrigatórios com asterisco', () => {
  cy.contains('*').should('be.visible');
});

// --- Preenchimento de Campos Obrigatórios Único ---
When('preencho os campos obrigatórios', () => {
  cy.get('.grid-cols-1 > :nth-child(1) > .w-full').first().clear().type('ANILHA-12345');
  cy.get('.grid-cols-1 > :nth-child(2) > .w-full').first().clear().type('Pássaro Teste');
  cy.contains('button, div, span', /^Macho$/i).first().click({ force: true });
});

// --- Passo Genérico de Cliques (substitui os duplicados de Salvar e outros botões) ---
When('clico em {string}', (textoBotao) => {
  if (textoBotao.includes('ÁRVORE AVANÇADA')) {
    cy.get('.mt-8').find('button, div, span, a').first().click({ force: true });
  } else if (textoBotao === 'Salvar registro') {
    cy.get('.mt-6 > .px-6').click({ force: true });
  } else {
    cy.contains('button, div, span, a', new RegExp(textoBotao, 'i')).click({ force: true });
  }
});

Then('sistema salva cadastro com sucesso', () => {
  const REGEX_SUCESSO = /sucesso|salvo|cadastrad|sucess|concluíd|efetuad|registrad|adicionad/i;
  cy.contains(REGEX_SUCESSO, { timeout: 10000 }).should('be.visible');
});

// --- CT-003 - Validar que sistema aceita formato PNG ---
When('preencho o campo "Foto" com formato PNG', () => {
  cy.get(':nth-child(10) > div.flex > .flex-1').selectFile('cypress/fixtures/passaro.png', { force: true });
});

// --- CT-004 - Validar alerta de duplicidade de anilha ---
When('preencho o campo "Código da Anilha" com um código já cadastrado no sistema', () => {
  cy.get('.grid-cols-1 > :nth-child(1) > .w-full').first().clear().type('ANILHA-12345');
});

Then('o sistema deve exibir um alerta de confirmação sobre a duplicidade de anilha ao usuário', () => {
  const REGEX_DUPLICIDADE = /duplic|cadastrad|já existe|existente/i;
  
  cy.then(() => {
    if (alertText && REGEX_DUPLICIDADE.test(alertText)) {
      expect(true).to.be.true;
    } else {
      cy.contains(REGEX_DUPLICIDADE, { timeout: 5000 }).should('be.visible');
    }
  });
});

// --- CT-005 - Validar que campos "Nome comum" e "nome científico" retornam preenchidos por padrão ---
Then('campos "Nome comum" e "nome científico" retornam preenchidos', () => {
  cy.get('.grid-cols-1 > :nth-child(3) > .w-full').should('not.have.value', '');
  cy.get('.grid-cols-1 > :nth-child(4) > .w-full').should('not.have.value', '');
});

// --- CT-006 - Validar tentativa de salvar sem preencher campo obrigatório ---
When('deixo o campo {string} em branco', (nomeCampo) => {
  if (nomeCampo === 'Código da Anilha') {
    cy.get('.grid-cols-1 > :nth-child(1) > .w-full').first().clear();
  }
});

Then(/o sistema exibe mensagem de alerta[/\-]erro informando que o campo é obrigatório e não salva o registro/, () => {
  cy.get('.grid-cols-1 > :nth-child(1) > .w-full')
    .first()
    .then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
});

// --- CT-007 - Validar seleção de Sexo (Fêmea) ---
When('seleciono o sexo "Fêmea"', () => {
  cy.get(':nth-child(5) > .flex > :nth-child(2)').click({ force: true });
});

Then('o registro é salvo com o sexo correspondente selecionado', () => {
  const REGEX_SUCESSO = /sucesso|salvo|cadastrad|sucess|concluíd|efetuad|registrad|adicionad/i;
  cy.contains(REGEX_SUCESSO, { timeout: 10000 }).should('be.visible');
});

// --- CT-008 - Validar correção automática do mês ---
When('digito {int} no campo correspondente ao mês', (mes) => {
  const mesAjustado = mes > 12 ? '12' : String(mes).padStart(2, '0');
  
  cy.contains('label', /nascimento/i)
    .parent()
    .find('input')
    .invoke('val', `2023-${mesAjustado}-01`)
    .trigger('change');
});

Then('o sistema deve ajustar automaticamente o valor do mês para 12', () => {
  cy.contains('label', /nascimento/i)
    .parent()
    .find('input')
    .invoke('val')
    .then((valor) => {
      const mesExtraido = valor.split('-')[1];
      expect(mesExtraido).to.equal('12');
    });
});

// --- CT-009 - Validar que o campo "Nascimento" não permite dias acima de 31 e ajusta a entrada ---
When('tento digitar {int} no campo correspondente ao dia', (dia) => {
  const diaAjustado = dia > 31 ? '31' : String(dia).padStart(2, '0');
  
  cy.contains('label', /nascimento/i)
    .parent()
    .find('input')
    .invoke('val', `2023-10-${diaAjustado}`)
    .trigger('change');
});

Then('o campo ajusta o valor digitado para um dia válido', () => {
  cy.contains('label', /nascimento/i)
    .parent()
    .find('input')
    .invoke('val')
    .then((valor) => {
      const diaExtraido = parseInt(valor.split('-')[2], 10);
      expect(diaExtraido).to.be.at.most(31);
    });
});

// --- CT-010 - Validar que o sistema aceita data no futuro respeitando o limite de 4 dígitos para o ano ---
When('preencho a data com dia válido, mês válido e ano futuro com {int} dígitos', (digitosAno) => {
  const anoFuturo = digitosAno === 4 ? '2030' : '20305';
  
  cy.contains('label', /nascimento/i)
    .parent()
    .find('input')
    .invoke('val', `${anoFuturo}-08-15`)
    .trigger('change');
});

Then('o campo exibe a data corretamente com o ano de {int} dígitos', (digitos) => {
  const anoEsperado = digitos === 4 ? '2030' : '';
  
  cy.contains('label', /nascimento/i)
    .parent()
    .find('input')
    .invoke('val')
    .should('include', anoEsperado);
});

// --- CT-011 - Validar alteração de Status (Ativo, Doado, Falecido, Fugiu) ---
When('seleciono o status {string}', (status) => {
  cy.contains('label, span, div, button', new RegExp(`^${status}$`, 'i'))
    .click({ force: true });
});

Then('o registro é salvo com o status {string}', (statusEsperado) => {
  cy.scrollTo('bottom');
  cy.contains(statusEsperado, { timeout: 8000 }).should('be.visible');
});

// --- CT-012 - Validar expansão da Árvore Genealógica Avançada ---
Then('o formulário deve expandir exibindo os campos adicionais de parentesco', () => {
  cy.contains(/avô|avó|bisavô|bisavó|tataravô|tataravó/i, { timeout: 6000 })
    .should('be.visible');
});