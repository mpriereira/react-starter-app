import { useParams } from "react-router-dom";
import { useGitHubRepository } from "./useGitHubRepository";
import { useMemo } from "react";
import { ReactComponent as Lock } from "/src/assets/svg/lock.svg";
import { ReactComponent as Unlock } from "/src/assets/svg/unlock.svg";
import styles from "./GitHubRepositoryDetail.module.scss";
import { useInViewport } from "../layout/useInViewport";
import { PullRequests } from "./PullRequests";
import {
	GitHubRepositoryPullRequestRepository
} from "../../domain/GitHubRepositoryPullRequestRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

type GitHubRepositoryDetailParams = {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	gitHubRepositoryPullRequestRepository: GitHubRepositoryPullRequestRepository;
}

export function GitHubRepositoryDetail({ gitHubRepositoryRepository, gitHubRepositoryPullRequestRepository }: GitHubRepositoryDetailParams) {
	const { organization, name } = useParams() as { organization: string; name: string };

	const repositoryId = useMemo(() => ({ name, organization }), [name, organization]);

	const { repositoryData } = useGitHubRepository(gitHubRepositoryRepository, repositoryId);
	const { isInViewport, ref } = useInViewport();

	if (!repositoryData) {
		return <span>No existe el Repositorio</span>;
	}

	return (
		<section className={styles["repository-detail"]}>
			<header className={styles.header}>
				<a href={repositoryData.url} target="_blank" rel="noreferrer">
					<h2 className={styles.header__title}>
						{repositoryData.id.organization}/{repositoryData.id.name}
					</h2>
				</a>
				{repositoryData.private ? <Lock /> : <Unlock />}
			</header>

			<p>{repositoryData.description}</p>

			<h3>Repository stats</h3>
			<table className={styles.detail__table}>
				<thead>
				<tr>
					<th>Stars</th>
					<th>Watchers</th>
					<th>Forks</th>
					<th>Issues</th>
					<th>Pull Requests</th>
				</tr>
				</thead>

				<tbody>
				<tr>
					<td>{repositoryData.stars}</td>
					<td>{repositoryData.watchers}</td>
					<td>{repositoryData.forks}</td>
					<td>{repositoryData.issues}</td>
					<td>{repositoryData.pullRequests}</td>
				</tr>
				</tbody>
			</table>

			<h3>Workflow runs status</h3>

			{repositoryData.workflowRunsStatus.length > 0 ? (
				<>
					<p>
						⏱️Last workflow run:{" "}
						{repositoryData.workflowRunsStatus[0].createdAt.toLocaleDateString("es-ES")}
					</p>
					<table className={styles.detail__table}>
						<thead>
						<tr>
							<th>Name</th>
							<th>Title</th>
							<th>Date</th>
							<th>Status</th>
							<th>Conclusion</th>
						</tr>
						</thead>
						<tbody>
						{repositoryData.workflowRunsStatus.map((run) => (
							<tr key={run.id}>
								<td>{run.name}</td>
								<td>
									<a href={run.url} target="_blank" rel="noreferrer">
										{run.title}
									</a>
								</td>
								<td>{run.createdAt.toLocaleDateString("es-ES")}</td>
								<td>{run.status}</td>
								<td>{run.conclusion}</td>
							</tr>
						))}
						</tbody>
					</table>
				</>
			) : <p>There are no workflow runs</p>}

			<section ref={ref}>
				{isInViewport && (
					<PullRequests
						repository={gitHubRepositoryPullRequestRepository}
						repositoryId={repositoryId}
					/>
				)}
			</section>
		</section>
	);
}
