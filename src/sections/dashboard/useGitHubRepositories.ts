import { useEffect, useState } from "react";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export function useGitHubRepositories(repository: GitHubRepositoryRepository, repositoryUrls: string[]): { repositoryData: GitHubRepository[] } {
	const [repositoryData, setGitHubApiResponse] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(repositoryUrls)
			.then((response) => {
				setGitHubApiResponse(response);
			});
	}, [repository, repositoryUrls]);

	return { repositoryData };
}
