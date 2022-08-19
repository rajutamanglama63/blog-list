describe("Blog app", function () {
  //   it("front page can be opened", function () {
  //     cy.visit("http://localhost:3000");
  //   });

  beforeEach(function () {
    cy.request("POST", "http://localhost:4000/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });
});
