import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { mock, MockProxy } from "vitest-mock-extended";

import { GitHubRepositoryRepository } from "../../../src/domain/GitHubRepositoryRepository";
import { RepositoryWidgetRepository } from "../../../src/domain/RepositoryWidgetRepository";
import { Dashboard } from "../../../src/sections/dashboard/Dashboard";
import { GitHubRepositoryMother } from "../../GitHubRepositoryMother";
import { renderWithRouter } from "../../renderWithRouter";

const mockGitHubRepositoryRepository: MockProxy<GitHubRepositoryRepository> = mock();
const mockRepositoryWidgetRepository: MockProxy<RepositoryWidgetRepository> = mock();

describe("Dashboard section", () => {
	test("show all widgets", async () => {
		const gitHubRepository = GitHubRepositoryMother.create();

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockRepositoryWidgetRepository}
			/>
		);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeDefined();
	});

	test("show not results message when there are no widgets", async () => {
		mockGitHubRepositoryRepository.search.mockResolvedValue([]);

		renderWithRouter(
			<Dashboard
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockRepositoryWidgetRepository}
			/>
		);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeDefined();
	});

	test("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				gitHubRepositoryRepository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockRepositoryWidgetRepository}
			/>
		);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeDefined();
	});
});
