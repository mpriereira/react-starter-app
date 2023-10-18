import { screen } from "@testing-library/react";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GitHubRepositoryMother } from "./GitHubRepositoryMother";
import { mock, MockProxy } from "jest-mock-extended";
import { GitHubRepositoryRepository } from "../src/domain/GitHubRepositoryRepository";
import { renderWithRouter } from "./renderWithRouter";

const mockRepository: MockProxy<GitHubRepositoryRepository> = mock();

describe("Dashboard section", () => {
	test("show all widgets", async () => {
		const gitHubRepository = GitHubRepositoryMother.create();

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(<Dashboard repository={mockRepository} />);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});

	test("show not results message when there are no widgets", async () => {
		mockRepository.search.mockResolvedValue([]);

		renderWithRouter(<Dashboard repository={mockRepository} />);

		const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

		expect(noResults).toBeInTheDocument();
	});

	test("show last modified date in human readable format", async () => {
		const gitHubRepository = GitHubRepositoryMother.create({ updatedAt: new Date() });

		mockRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(<Dashboard repository={mockRepository} />);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
})
