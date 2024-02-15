describe('City Map Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost');
  });

  it('Affiche toutes les villes au chargement de la page', () => {
    cy.intercept('GET', 'http://localhost:8080/cities', { fixture: 'cities.json' }).as('getCities');
    cy.wait('@getCities');
    cy.get('#citiesList').children().should('have.length', 2009);
  });



  it('Recherche et trouve une ville', () => {
    cy.get('#search-input').clear();

    cy.intercept('GET', 'http://localhost:8080/cities').as('getSuggestions');

    cy.get('#search-input').type('Par');

    cy.wait(1000);


    cy.get('#suggestions-list').should('contain', 'Paris');
  });

  it('Affiche toutes les villes d\'une région lorsqu\'on clique dessus', () => {
    cy.intercept('GET', 'http://localhost:8080/cities?region=Ile-de-France').as('getCitiesByRegion');


    cy.get('path#FRIDF').click();


    cy.wait('@getCitiesByRegion');


    cy.get('#citiesList').should('be.visible');


    cy.get('#results-heading').should('contain', 'Ile-de-France');


  });




});