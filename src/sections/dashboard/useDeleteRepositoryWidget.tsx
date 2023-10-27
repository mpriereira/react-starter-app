import { DomainEvents } from "../../domain/DomainEvents";
import { RepositoryNotFoundError } from "../../domain/RepositoryNotFoundError";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";

export function useRemoveRepositoryWidget(repository: RepositoryWidgetRepository): {
	remove: (widgetId: string) => Promise<RepositoryNotFoundError | void>;
} {
	async function remove(widgetId: string): Promise<RepositoryNotFoundError | void> {
		const widgetRepositories = await repository.search();

		if (!widgetRepositories.find((w) => w.id === widgetId)) {
			return new RepositoryNotFoundError(widgetId);
		}

		await repository.delete(widgetId);
		document.dispatchEvent(new CustomEvent(DomainEvents.repositoryWidgetRemoved));
	}

	return { remove };
}
