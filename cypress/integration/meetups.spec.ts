import { login } from './utils/cypress';

describe('Render the home page with menu', () => {
  beforeEach(() => {
    login('Kip', 'private');
  });

  it('should visit the home page', () => {
    cy.visit('/meetups');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/meetups');
    });
  });

  it('should display meetups menu', () => {
    cy.get('[data-cy=meetups-menu-link]').should('have.length', 4);
    cy.get('[data-cy=meetups-menu-link]').first().should('have.text', 'Topics');
    cy.get('[data-cy=meetups-menu-link]').last().should('have.text', 'Past');
  });
});

describe('Render topic page', () => {
  beforeEach(() => {
    login('Kip', 'private');
  });

  it('should open topic page', () => {
    cy.get('[data-cy=topic-page-link]').first().should('exist');
    cy.get('[data-cy=topic-page-link]').first().click();
    cy.get('[data-cy=topic-page-heading]').should('have.text', 'Viewing Topic');
  });

  it('should go back to main page', () => {
    cy.get('[data-cy=topic-page-link]').first().click();
    cy.get('[data-testid=topic-back-btn]').click();
    cy.get('[data-cy=meetups-heading]').should('contain', 'Meetups');
    cy.location('pathname').should('include', 'meetups');
  });
});

describe('Work with meetups creating form', () => {
  beforeEach(() => {
    login('Kip', 'private');
  });

  it('should correctly render meetup multi-step form', () => {
    cy.waitUntil(() =>
      cy.get('[data-testid=create-btn]')
        .as('someAlias')
        .wait(10)
        .then($el => Cypress.dom.isAttached($el)),
      { timeout: 1000, interval: 10 })
      .get('@someAlias')
      .click();
    cy.get('[data-cy=creating-form]').should('exist');
  });

  it('should start with step one "Obligatory fields"', () => {
    cy.waitUntil(() =>
      cy.get('[data-testid=create-btn]')
        .as('someAlias')
        .wait(10)
        .then($el => Cypress.dom.isAttached($el)),
      { timeout: 1000, interval: 10 })
      .get('@someAlias')
      .click();
    cy.get('[data-cy=step-num]').parent().first().should('have.text', '1Obligatory Fields');
    cy.get('[data-cy=step-num]').parent().first().invoke('attr', 'class').should('contain', 'active');
  });

  it('should provide fields values, open step two and create new meetup', () => {
    cy.waitUntil(() =>
      cy.get('[data-testid=create-btn]')
        .as('someAlias')
        .wait(10)
        .then($el => Cypress.dom.isAttached($el)),
      { timeout: 1000, interval: 10 })
      .get('@someAlias')
      .click();
    cy.get('#subject').type('React');
    cy.get('#speaker').type('John Doe');
    cy.get('#excerpt').type('Some description');
    cy.get('[data-testid=next-step-btn]').click();
    cy.get('[data-cy=step-num]').parent().last().should('have.text', '2Extra Fields');
    cy.get('[data-cy=step-num]').parent().last().invoke('attr', 'class').should('contain', 'active');
    cy.get('#start').type('2023-01-01T17:45:39.353Z');
    cy.get('#finish').type('2023-01-01T18:09:39.353Z');
    cy.get('#place').type('Minsk');
    cy.get('[data-test-id=meetup-form-btn]').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/meetups');
    });
    cy.get('[data-cy=topic-page-link]').last().should('contain', 'React');
  });

  it('should open a newly created theme', () => {
    cy.get('[data-cy=topic-page-link]').last().click();
    cy.get('[data-cy=topic-page-subject]').should('have.text', 'React');
  });
});
