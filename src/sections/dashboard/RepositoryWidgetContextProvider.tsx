import React, { createContext, useContext, useEffect, useState } from "react";

import { DomainEvents } from "../../domain/DomainEvents";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";

type RepositoryWidgetContextProviderParams = {
	children: React.ReactElement;
	repository: RepositoryWidgetRepository;
};

const RepositoryWidgetContext = createContext<{ repositoryWidgets: RepositoryWidget[] }>({
	repositoryWidgets: [],
});

export function RepositoryWidgetContextProvider({
	children,
	repository,
}: RepositoryWidgetContextProviderParams) {
	const [repositoryWidgets, setRepositoryWidgets] = useState<RepositoryWidget[]>([]);

	useEffect(() => {
		repository.search().then((repositoryWidgets) => {
			setRepositoryWidgets(repositoryWidgets);
		});
	}, [repository]);

	useEffect(() => {
		const reloadRepositoryWidgets = () => {
			repository.search().then(setRepositoryWidgets);
		};

		document.addEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets);
		document.addEventListener(DomainEvents.repositoryWidgetRemoved, reloadRepositoryWidgets);

		return () => {
			document.removeEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets);
			document.removeEventListener(DomainEvents.repositoryWidgetRemoved, reloadRepositoryWidgets);
		};
	}, [repository]);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
}

export const useRepositoryWidgetContextProvider = () => useContext(RepositoryWidgetContext);
