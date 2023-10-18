import React from "react";
import { Dashboard } from "./Dashboard";
import {
	GitHubApiGitHubRepositoryRepository
} from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { config } from "../../devdash_config";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export class DashboardFactory {
	static create(): React.ReactElement {
		return <Dashboard repository={repository} />;
	}
}
