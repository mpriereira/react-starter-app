import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { AddWidgetForm } from "./AddWidgetForm";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

const gitHubRepositoryUrls = config.widgets.map((widget) => widget.repository_url);

type DashboardParams = {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
};

export function Dashboard({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
}: DashboardParams) {
	const { repositoryData, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoryUrls
	);

	return (
		<>
			<section className={styles.container}>
				{isLoading ? (
					<WidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				) : (
					repositoryData.map((repository) => (
						<GitHubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							repository={repository}
						/>
					))
				)}
				<AddWidgetForm repository={repositoryWidgetRepository} />
			</section>

			{!isLoading && repositoryData.length === 0 && (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			)}
		</>
	);
}
