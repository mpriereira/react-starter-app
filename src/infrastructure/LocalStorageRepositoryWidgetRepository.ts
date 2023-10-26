import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	localStorageKey = "repositoryWidgets";
	async save(widget: RepositoryWidget): Promise<void> {
		const currentRepositoryWidgets = await this.search();

		localStorage.setItem(
			this.localStorageKey,
			JSON.stringify([...currentRepositoryWidgets, widget])
		);
	}

	async search(): Promise<RepositoryWidget[]> {
		const data = localStorage.getItem(this.localStorageKey);

		if (!data) {
			return Promise.resolve([]);
		}

		return Promise.resolve(JSON.parse(data) as RepositoryWidget[]);
	}
}
