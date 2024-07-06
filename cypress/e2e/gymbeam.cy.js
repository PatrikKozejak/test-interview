describe("First Test", () => {
  it("Ensure Last Visited Item Appears First on Homepage", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      // Check if the error message contains 'tp is not defined'
      if (err.message.includes("tp is not defined")) {
        // Cypress will not fail the test for this specific error
        return false;
      }
      // Return true to let the error propagate and fail the test
      return true;
    });

    cy.visit("https://gymbeam.sk/").wait(3000);

    // Dismiss the cookie dialog
    cy.get("#CybotCookiebotDialogBodyButtonDecline").click().wait(3000);

    // Declare variables to store the product titles
    let firstProductTitle;
    let lastProductTitle;

    // Get the title of the first product
    cy.get(".product-item-link")
      .first()
      .invoke("text")
      .then((text) => {
        firstProductTitle = text.trim();
        cy.log(`First product title: ${firstProductTitle}`);
      });

    // Get the title of the last product
    cy.get(".product-item-link")
      .eq(7)
      .invoke("text")
      .then((text) => {
        lastProductTitle = text.trim();
        cy.log(`Last product title: ${lastProductTitle}`);

        // Click on the last product
        cy.get(".product-item-click").eq(7).click();

        // Assert that the page title contains the last product title
        cy.get("[data-ui-id='page-title-wrapper']")
          .wait(500)
          .should("have.text", lastProductTitle);

        // Navigate back to the homepage using main logo
        cy.get(".logo.no-lozad").click().wait(3000);

        // Assert that the first product title matches the stored value
        cy.get(".product-item-link")
          .first()
          .should("have.text", lastProductTitle);
      });
  });
});
