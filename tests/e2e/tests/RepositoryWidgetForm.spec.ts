import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";

before(() => {
	localStorage.setItem("github_access_token", Cypress.env("api_token") as string);
});

describe("Repository Widget Form", () => {
	it("Add new repository with id and url", () => {
		cy.visit("/");

		cy.addWidgetToDashboard(
			RepositoryWidgetMother.create({
				repositoryUrl: "https://github.com/CodelyTV/DevDash",
			})
		);

		const widget = cy.findByText("CodelyTV/react-devdash");

		widget.should("exist");
	});

	it("Show error when respository already exists in Dashboard", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		});

		cy.visit("/");

		cy.addWidgetToDashboard(newWidget);
		cy.addWidgetToDashboard(newWidget);

		const errorMessage = cy.findByText("Repositorio duplicado");

		errorMessage.should("exist");
	});
});
