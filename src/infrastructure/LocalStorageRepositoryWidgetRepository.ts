import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	// eslint-disable-next-line unused-imports/no-unused-vars
	async save(widget: RepositoryWidget): Promise<void> {
		await Promise.resolve();
	}

	async search(): Promise<RepositoryWidget[]> {
		return Promise.resolve([]);
	}
}
