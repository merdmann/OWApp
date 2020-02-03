describe('Enter a location', function () {
    it( 'if country code is given it shows the lacation weathtr', function () {
           cy.visit('/') 
           cy.get('#search-text').type('Berlin')
    }); 
});