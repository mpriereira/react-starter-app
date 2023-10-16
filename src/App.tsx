import { Dashboard } from "./sections/dashboard/Dashboard";
import {
	GitHubApiGitHubRepositoryRepository
} from "./infrastructure/GitHubApiGitHubRepositoryRepository";
import { config } from "./devdash_config";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export function App() {
	return <Dashboard repository={repository} />;
}
