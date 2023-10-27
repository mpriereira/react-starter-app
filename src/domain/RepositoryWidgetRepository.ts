import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	search(): Promise<RepositoryWidget[]>;
	save(widget: RepositoryWidget): Promise<void>;
	delete(id: string): Promise<void>;
}
