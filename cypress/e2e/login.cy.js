const email = 'test@test.com';
const password = 'test';

context('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Successfully logins with the valid credentials', () => {
    cy.login(`${email}`, `${password}`);

    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  });

  it('Show error message on empty login', () => {
    cy.login(null, `${password}`);

    cy.get('#mail')
      .then((element) => element[0].checkValidity())
      .should('be.false');

    cy.get('#mail')
      .then((element) => element[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });

  it('Show error message on empty password', () => {
    cy.login(`${email}`, null);

    cy.get('#pass')
      .then((element) => element[0].checkValidity())
      .should("be.false");

    cy.get('#pass')
      .then((element) => element[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });
});
