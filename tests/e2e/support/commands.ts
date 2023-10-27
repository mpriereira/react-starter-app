// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";

Cypress.Commands.add("addWidgetToDashboard", (widget: RepositoryWidget) => {
	cy.findByRole("button", {
		name: new RegExp("Añadir", "i"),
	}).click();

	cy.findByLabelText(/Id/i).type(widget.id);
	cy.findByLabelText(/Url del repositorio/i).type(widget.repositoryUrl);

	cy.findByRole("button", {
		name: /Añadir/i,
	}).click();
});
