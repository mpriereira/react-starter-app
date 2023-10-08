import { githubApiResponses } from "../../github_api_responses";
import Lock from "/src/assets/svg/lock.svg?react";
import Unlock from "/src/assets/svg/unlock.svg?react";
import Check from "/src/assets/svg/check.svg?react";
import Error from "/src/assets/svg/error.svg?react";

import styles from "./Dashboard.module.scss";

export function Dashboard() {
	const title = "DevDash_";

	const isoToReadableDate = (lastUpdate: string): string => {
		const lastUpdateDate = new Date(lastUpdate);
		const currentDate = new Date();
		const diffDays = currentDate.getDate() - lastUpdateDate.getDate();

		if (diffDays === 0) {
			return "today";
		}

		if (diffDays > 30) {
			return "more than a month ago";
		}

		return `${diffDays} days ago`;
	}

	return (
		<>
			<header className={styles.container}>
				<h1>{title}</h1>
			</header>
			<section className={styles.container}>
				{githubApiResponses.map((repository) => (
					<article className={styles.widget} key={repository.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={repository.repositoryData.html_url}
								target="_blank"
								title={`${repository.repositoryData.organization.login}/${repository.repositoryData.name}`}
								rel="noreferrer"
							>
								{repository.repositoryData.organization.login}/{repository.repositoryData.name}
							</a>
							{repository.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<p>Last update {isoToReadableDate(repository.repositoryData.updated_at)}</p>
						{repository.ciStatus.workflow_runs.length > 0 && (
							<div>
								{repository.ciStatus.workflow_runs[0].status === 'completed' ? <Check /> : <Error />}
							</div>
						)}
					</article>
				))}
			</section>
		</>
	);
}
