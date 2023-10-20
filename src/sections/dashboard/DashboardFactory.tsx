import React from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageRepositoryWidgetRepository";
import { Dashboard } from "./Dashboard";

const gitHubApiGitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	config.github_access_token
);

const repositoryWidgetRepository = new LocalStorageRepositoryWidgetRepository();

export class DashboardFactory {
	static create(): React.ReactElement {
		return (
			<Dashboard
				gitHubRepositoryRepository={gitHubApiGitHubRepositoryRepository}
				repositoryWidgetRepository={repositoryWidgetRepository}
			/>
		);
	}
}
