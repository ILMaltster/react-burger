describe('make an order',()=> {
    beforeEach(()=>{
        cy.intercept(
            "GET",
            'https://norma.nomoreparties.space/api/ingredients',
            {fixture: 'all-ingredients.json'}
        )

        cy.visit('http://localhost:3000/');
    })

    it("drag and drop ingredients", ()=>{
         const dataTransfer = new DataTransfer();

         cy.get('#ingredientsMenu > *:nth-child(1) [draggable=true]').first()
             .trigger('dragstart', {
                 dataTransfer
             });
         cy.get('[class^="burger-constructor_container_"]').trigger('drop',{
             dataTransfer
         })

         cy.get('#ingredientsMenu > *:nth-child(2) [draggable=true]').first()
             .trigger('dragstart', {
                 dataTransfer
             });
         cy.get('[class^="burger-constructor_container_"]').trigger('drop',{
             dataTransfer
         })

         cy.get('#ingredientsMenu > *:nth-child(3) [draggable=true]').first()
             .trigger('dragstart', {
                 dataTransfer
             });
         cy.get('[class^="burger-constructor_container_"]').trigger('drop',{
             dataTransfer
         })

         cy.get('Button').contains("Оформить заказ").click();

         cy.get('[type=email]').type("ilya@mail.ru");
         cy.get('[type=password]').type("pass_pass");

         cy.intercept(
            "POST",
            'https://norma.nomoreparties.space/api/auth/login',
            {fixture: 'auth-data.json'}
         )

         cy.get('button').contains("Войти").click();

         cy.intercept(
             "POST",
             'https://norma.nomoreparties.space/api/orders',
             {fixture: 'order-request.json'}
         )

         cy.get('Button').contains("Оформить заказ").click();

         cy.get('[class*=modalWrapper]').should('be.visible');

         cy.get('[class*=order-details_number').should('not.be.empty');

         cy.get('[class*=modal_closeBlock').click();

         cy.get('[class*=modalWrapper]').should('not.exist');

     })
    it("click on ingredient and open modal window", ()=>{
        cy.get('#ingredientsMenu > *:nth-child(1) [draggable=true]').first().click();

        cy.get('[class*=ingredient-detail_wrapper] > img').should('have.attr', "src")
        cy.get('[class*=ingredient-detail_name]').should('not.be.empty')

        cy.get('[class*=modal_closeBlock').click();

        cy.get('[class*=modalWrapper]').should('not.exist');
    })
});