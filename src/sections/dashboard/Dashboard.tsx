import { useMemo } from "react";

import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { AddWidgetForm } from "./AddWidgetForm";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useRemoveRepositoryWidget } from "./useDeleteRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

type DashboardParams = {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidgets: RepositoryWidget[];
};

export function Dashboard({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
	repositoryWidgets,
}: DashboardParams) {
	const gitHubRepositoryUrls = useMemo(() => {
		return repositoryWidgets.map((widget) => widget.repositoryUrl);
	}, [repositoryWidgets]);

	const { repositoryData, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoryUrls
	);

	const { remove } = useRemoveRepositoryWidget(repositoryWidgetRepository);

	const handleWidgetRepositoryDelete = async (id: string) => {
		const error = await remove(id);
		if (error) {
			alert("No se ha podido eliminar el widget");
		}
	};

	return (
		<>
			<section className={styles.container}>
				{isLoading ? (
					<WidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				) : (
					repositoryData.map((repository, index) => (
						<GitHubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							repository={repository}
							widgetId={repositoryWidgets[index]?.id}
							onDelete={handleWidgetRepositoryDelete}
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
