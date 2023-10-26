import "react-loading-skeleton/dist/skeleton.css";

import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageRepositoryWidgetRepository";
import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/RepositoryWidgetContextProvider";

const repository = new LocalStorageRepositoryWidgetRepository();
export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
