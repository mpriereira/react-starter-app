import { useEffect, useState } from "react";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";

export function useGitHubRepository(repository: GitHubRepositoryRepository, repositoryId: RepositoryId): {
	repositoryData: GitHubRepository | undefined
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		repository
			.byId(repositoryId)
			.then((response) => {
				setRepositoryData(response);
			});
	}, [repository, repositoryId]);

	return { repositoryData };
}
