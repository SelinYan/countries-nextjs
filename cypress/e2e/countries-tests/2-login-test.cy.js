describe("Navigate to login and attempt login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174");
    cy.get("button").contains("Countries").click();
  });

  it("Navigate to login", () => {
    cy.visit("http://localhost:5174");
    // cy.get("h1").should("contain", "Home");
    cy.get("button").contains("Countries").click();
    cy.get("h1").should("contain", "Login");
  });

  it("Login title should be visible", () => {
    cy.get("h1").should("contain", "Login");
  });

  it("Login with invalid credentials", () => {
    cy.get("input[placeholder='Email']").type("Something");
    cy.get("input[placeholder='Password']").type("Something");
    cy.get('[data-id="login-button"]').click();
  });

  it("Login with valid credentials", () => {
    cy.get("input[placeholder='Email']").type("test@test.com");
    cy.get("input[placeholder='Password']").type("Abcd1234");
    cy.get('[data-id="login-button"]').click();
  });
});
