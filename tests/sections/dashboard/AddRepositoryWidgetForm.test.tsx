import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { mock, MockProxy } from "vitest-mock-extended";

import { RepositoryWidget } from "../../../src/domain/RepositoryWidget";
import { LocalStorageRepositoryWidgetRepository } from "../../../src/infrastructure/LocalStorageRepositoryWidgetRepository";
import { AddWidgetForm } from "../../../src/sections/dashboard/AddWidgetForm";

const mockRepository: MockProxy<LocalStorageRepositoryWidgetRepository> = mock();

describe("AddWidgetForm", () => {
	test("show widget form when add button is clicked", async () => {
		const user = userEvent.setup();

		render(<AddWidgetForm repository={mockRepository} />);

		const button = screen.getByRole("button", {
			name: new RegExp("Añadir", "i"),
		});

		await user.click(button);

		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(url).toBeDefined();
	});

	test("save new widget when form is submitted", async () => {
		const user = userEvent.setup();

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};
		mockRepository.search.mockResolvedValue([]);

		render(<AddWidgetForm repository={mockRepository} />);

		const button = screen.getByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		await user.click(button);

		const id = screen.getByLabelText(/Id/i);
		await user.type(id, newWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		await user.type(url, newWidget.repositoryUrl);

		const submitButton = screen.getByRole("button", {
			name: /Añadir/i,
		});
		await user.click(submitButton);

		const addAnotherRepositoryFormButton = screen.getByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		expect(addAnotherRepositoryFormButton).toBeDefined();
		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);
		mockRepository.save.mockReset();
	});

	test("show error when repository already exists in Dashboard", async () => {
		const user = userEvent.setup();

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

		const button = screen.getByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		await user.click(button);

		const id = screen.getByLabelText(/Id/i);
		await user.type(id, newWidgetWithSameUrl.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		await user.type(url, newWidgetWithSameUrl.repositoryUrl);

		const submitButton = screen.getByRole("button", {
			name: /Añadir/i,
		});
		await user.click(submitButton);

		const errorMessage = screen.getByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeDefined();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});

	test("do not allow to add widget with invalid URL", async () => {
		const user = userEvent.setup();

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "invalid-url",
		};
		mockRepository.search.mockResolvedValue([]);

		render(<AddWidgetForm repository={mockRepository} />);

		const button = screen.getByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		await user.click(button);

		const id = screen.getByLabelText(/Id/i);
		await user.type(id, newWidget.id);

		const url = screen.getByLabelText(/Url del repositorio/i);
		await user.type(url, newWidget.repositoryUrl);

		const submitButton = screen.getByRole<HTMLInputElement>("button", {
			name: /Añadir/i,
		});

		await user.click(submitButton);

		expect(submitButton.disabled).toBe(true);
		expect(mockRepository.save).not.toHaveBeenCalled();
	});
});
