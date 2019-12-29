describe('Test Book search', function() {
    context('basic', function() {
        it('can open', function() {
            cy.request("https://relaxed-einstein-f83244.netlify.com");
        })
    })

    it('can locate a book by name', function() {
        cy.get("search-string").type("Guru");
    })
});