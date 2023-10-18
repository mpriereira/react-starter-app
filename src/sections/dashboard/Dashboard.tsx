import { config } from "../../devdash_config";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const { repositoryData } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	return (
		<>
			{repositoryData.length === 0 ? (
					<div className={styles.empty}>
						<span>No hay widgets configurados.</span>
					</div>
				) : (
					<section className={styles.container}>
					{repositoryData.map((widget) => (
						<GitHubRepositoryWidget
							key={`${widget.id.organization}/${widget.id.name}`}
							repository={widget}
						/>
					))}
				</section>
			)}
		</>
	);
}
