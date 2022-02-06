import { login } from './utils/cypress';

describe('Render the news page', () => {
  beforeEach(() => {
    login('Kip', 'private');
  });

  it('should open news page', () => {
    cy.visit('/news');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/news');
    });
  });
});

describe('Creating news', () => {
  beforeEach(() => {
    login('Kip', 'private');
  });

  it('should open creating news form', () => {
    cy.visit('/news');
    cy.waitUntil(() =>
      cy.get('[data-testid=create-btn]')
        .as('someAlias')
        .wait(10)
        .then($el => Cypress.dom.isAttached($el)),
      { timeout: 1000, interval: 10 })
      .get('@someAlias')
      .click();
  });

  it('should provide values and create news', () => {
    cy.visit('/news');
    cy.waitUntil(() =>
      cy.get('[data-testid=create-btn]')
        .as('someAlias')
        .wait(10)
        .then($el => Cypress.dom.isAttached($el)),
      { timeout: 1000, interval: 10 })
      .get('@someAlias')
      .click();
    cy.get('#title').type('News Title');
    cy.get('#text').type('Some Text');
    cy.get('[data-testid=news-form-btn]').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/news');
    });
  });

  it('should exist a newly created news', () => {
    cy.visit('/news');
    cy.get('[data-cy=news-item]').last().should('contain', 'News Title');
  });
});
