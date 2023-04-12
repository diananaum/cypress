const email = 'test@test.com';
const password = 'test';

const bookName = 'Harry Potter';
const bookAuthor = 'J. K. Rowling';

describe('Book favourites', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(email, password);
    cy.addBook(bookName, bookAuthor);
  });

  it('Successfully add the new book to favourites', () => {
    cy.addToFav();

    cy.get('.container .card-deck')
      .should('contain', bookName);
  });

  it('Successfully delete the book from favourites', () => {
    cy.addToFav();
    
    cy.contains(bookName).should('be.visible');

    cy.contains('Delete from favorite').click();

    cy.visit('http://localhost:3000/favorites');

    cy.get('.container .card-deck')
      .should('not.have.class', 'mt-3');
  });

  it('Successfully add the new book to favourites from main page', () => {
    cy.contains("Submit").click();
    
    cy.contains(bookName).should('be.visible');

    cy.contains('Add to favorite').click();

    cy.contains('Delete from favorite')
      .should('be.visible');
  });
});