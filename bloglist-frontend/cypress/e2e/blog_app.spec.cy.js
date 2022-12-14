describe("Blog app", function () {
  //   it("front page can be opened", function () {
  //     cy.visit("http://localhost:3000");
  //   });

  beforeEach(function () {
    cy.request("POST", "http://localhost:4000/api/testing/reset");
    const user = {
      name: "Raju Lama",
      username: "raju@23",
      password: "1234",
    };

    cy.request("POST", "http://localhost:4000/api/users/", user).then((res) => {
      console.log(res.body);
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("raju@23");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();

      cy.contains("Raju Lama logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("raju@23");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Invalid credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "raju@23", password: "1234" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("John Doe");
      cy.get("#url").type("http://randomsite.com");
      cy.contains("create").click();
      cy.contains("a blog created by cypress");
    });

    it("user can like a blog", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("how to create a blog");
      cy.get("#author").type("Jonny");
      cy.get("#url").type("blog@23.com");
      cy.get("#create").click();

      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1");
    });

    it("user can delete a blog", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("how to create a blog");
      cy.get("#author").type("Jonny");
      cy.get("#url").type("blog@23.com");
      cy.get("#create").click();

      cy.contains("view").click();
      //   cy.contains("delete").click();
      //   cy.contains("how to create a blog").should("not.exist");
    });
  });
});
