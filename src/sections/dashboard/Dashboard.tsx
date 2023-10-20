import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const { repositoryData, isLoading } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	return (
		<>
			{isLoading && (
				<section className={styles.container}>
					<WidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				</section>
			)}

			{!isLoading && repositoryData.length === 0 ? (
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
