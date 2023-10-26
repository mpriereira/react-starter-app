import React from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageRepositoryWidgetRepository";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContextProvider } from "./RepositoryWidgetContextProvider";

const gitHubApiGitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export function DashboardFactory() {
	const { repositoryWidgets } = useRepositoryWidgetContextProvider();

	return (
		<Dashboard
			gitHubRepositoryRepository={gitHubApiGitHubRepositoryRepository}
			repositoryWidgetRepository={repositoryWidgetRepository}
			repositoryWidgets={repositoryWidgets}
		/>
	);
}
