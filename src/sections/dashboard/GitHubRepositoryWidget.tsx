import { Link } from "react-router-dom";

import { ReactComponent as Check } from "../../assets/svg/check.svg";
import { ReactComponent as Error } from "../../assets/svg/error.svg";
import { ReactComponent as PullRequests } from "../../assets/svg/git-pull-request.svg";
import { ReactComponent as IssueOpened } from "../../assets/svg/issue-opened.svg";
import { ReactComponent as Lock } from "../../assets/svg/lock.svg";
import { ReactComponent as Forks } from "../../assets/svg/repo-forked.svg";
import { ReactComponent as Star } from "../../assets/svg/star.svg";
import { ReactComponent as Unlock } from "../../assets/svg/unlock.svg";
import { ReactComponent as Watchers } from "../../assets/svg/watchers.svg";
import { GitHubRepository } from "../../domain/GitHubRepository";
import styles from "./GitHubRepositoryWidget.module.scss";

type GitHubRepositoryWidgetParams = {
	repository: GitHubRepository;
	widgetId: string;
	onDelete: (id: string) => Promise<void>;
};

const isoToReadableDate = (lastUpdateDate: Date): string => {
	const currentDate = new Date();
	const diffDays = Math.round(
		(currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 3600 * 24)
	);

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function GitHubRepositoryWidget({
	repository,
	widgetId,
	onDelete,
}: GitHubRepositoryWidgetParams) {
	const handleDelete = () => {
		onDelete(widgetId).then();
	};

	return (
		<article className={styles.widget} key={repository.id.name}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<Link to={`/repository/${repository.id.organization}/${repository.id.name}`}>
						{repository.id.organization}/{repository.id.name}
					</Link>
				</h2>
				<div className={styles.widget__icons}>
					<Error onClick={handleDelete} />
					{repository.private ? <Lock /> : <Unlock />}
				</div>
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(repository.updatedAt)}</p>
					{repository.hasWorkflows && (
						<div>{repository.isLastWorkflowSuccess ? <Check /> : <Error />}</div>
					)}
				</div>
				<p className={styles.widget__description}>{repository.description}</p>
				<footer className={styles.widget__footer}>
					<div className={styles.widget__stat}>
						<Star />
						<span>{repository.stars}</span>
					</div>
					<div className={styles.widget__stat}>
						<Watchers />
						<span>{repository.watchers}</span>
					</div>
					<div className={styles.widget__stat}>
						<Forks />
						<span>{repository.forks}</span>
					</div>
					<div className={styles.widget__stat}>
						<IssueOpened />
						<span>{repository.issues}</span>
					</div>
					<div className={styles.widget__stat}>
						<PullRequests />
						<span>{repository.pullRequests}</span>
					</div>
				</footer>
			</div>
		</article>
	);
}
