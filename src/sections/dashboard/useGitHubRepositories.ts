import { useEffect, useState } from "react";

import { DomainEvents } from "../../domain/DomainEvents";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export function useGitHubRepositories(
	repository: GitHubRepositoryRepository,
	repositoryUrls: string[]
): { repositoryData: GitHubRepository[]; isLoading: boolean } {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository.search(repositoryUrls).then((response) => {
			setRepositoryData(response);
			setIsLoading(false);
			document.dispatchEvent(new CustomEvent(DomainEvents.pageLoaded));
		});
	}, [repository, repositoryUrls]);

	return { repositoryData, isLoading };
}
