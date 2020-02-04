describe('Enter a location', function() {
    it('if country code is given it shows the lacation weathter', function() {
        cy.visit('/')
        cy.get('#search-text').type('Berlin')
        cy.wait(1000)
        cy.get('#location-list option').first().should('have.text', '2950158')
    });
});
