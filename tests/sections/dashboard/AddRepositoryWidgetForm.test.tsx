import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock, MockProxy } from "jest-mock-extended";

import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";
import { LocalStorageRepositoryWidgetRepository } from "../../../src/infrastructure/LocalStorageRepositoryWidgetRepository";
import { AddWidgetForm } from "../../../src/sections/dashboard/AddWidgetForm";

const mockRepository: MockProxy<LocalStorageRepositoryWidgetRepository> = mock();

describe("AddWidgetForm", () => {
	test("show widget form when add button is clicked", async () => {
		render(<AddWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});

		act(() => userEvent.click(button));

		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	test("save new widget when form is submitted", async () => {
		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};
		mockRepository.search.mockResolvedValue([]);

		render(<AddWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		act(() => userEvent.click(button));

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidget.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		userEvent.click(submitButton);

		const addAnotherRepositoryFormButton = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeInTheDocument();
		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);
		mockRepository.save.mockReset();
	});

	test("show error when repository already exists in Dashboard", async () => {
		const existingWidget: RepositoryWidget = {
			id: "existingWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};
		mockRepository.search.mockResolvedValue([existingWidget]);

		const newWidgetWithSameUrl: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		act(() => userEvent.click(button));

		const id = screen.getByLabelText(/Id/i);
		userEvent.type(id, newWidgetWithSameUrl.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		userEvent.type(url, newWidgetWithSameUrl.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});
		act(() => userEvent.click(submitButton));

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});
});
