import { useEffect, useState } from "react";
import {
	GitHubApiGitHubRepositoryRepository
} from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { config } from "../../devdash_config";
import { GitHubApiResponses } from "../../infrastructure/GitHubApiResponse";
import Lock from "/src/assets/svg/lock.svg?react";
import Unlock from "/src/assets/svg/unlock.svg?react";
import Check from "/src/assets/svg/check.svg?react";
import Error from "/src/assets/svg/error.svg?react";
import Brand from "/src/assets/svg/brand.svg?react";
import Star from "/src/assets/svg/star.svg?react";
import Watchers from "/src/assets/svg/watchers.svg?react";
import Forks from "/src/assets/svg/repo-forked.svg?react";
import IssueOpened from "/src/assets/svg/issue-opened.svg?react";
import PullRequests from "/src/assets/svg/git-pull-request.svg?react";
import styles from "./Dashboard.module.scss";

let isInit = false;

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffDays = Math.round((currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
}

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export function Dashboard() {
	const [gitHubApiResponse, setGitHubApiResponse] = useState<GitHubApiResponses[]>([]);

	useEffect(() => {
		if (!isInit) {
			repository.search(config.widgets.map((widget) => widget.repository_url)).then((response) => {
				setGitHubApiResponse(response);
			});
		}

		return () => {
			isInit = true;
		};
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{gitHubApiResponse.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.ciStatus.workflow_runs.length > 0 && (
									<div>
										{widget.ciStatus.workflow_runs[0].status === 'completed' ? <Check /> : <Error />}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Star />
									<span>{widget.repositoryData.stargazers_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.repositoryData.watchers_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.repositoryData.forks_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.repositoryData.open_issues_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequests.length}</span>
								</div>
							</footer>
						</div>
					</article>
				))}
			</section>
		</>
	);
}
