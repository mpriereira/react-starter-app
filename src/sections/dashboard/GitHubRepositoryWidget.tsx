import { GitHubRepository } from "../../domain/GitHubRepository";
import styles from "./GitHubRepositoryWidget.module.scss"
import { ReactComponent as Star } from "/src/assets/svg/star.svg";
import { ReactComponent as Watchers } from "/src/assets/svg/watchers.svg";
import { ReactComponent as Forks } from "/src/assets/svg/repo-forked.svg";
import { ReactComponent as IssueOpened } from "/src/assets/svg/issue-opened.svg";
import { ReactComponent as PullRequests } from "/src/assets/svg/git-pull-request.svg";
import { ReactComponent as Lock } from "/src/assets/svg/lock.svg";
import { ReactComponent as Unlock } from "/src/assets/svg/unlock.svg";
import { ReactComponent as Check } from "/src/assets/svg/check.svg";
import { ReactComponent as Error } from "/src/assets/svg/error.svg";

const isoToReadableDate = (lastUpdateDate: Date): string => {
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

export function GitHubRepositoryWidget({widget}: { widget: GitHubRepository }) {
	return (
		<article className={styles.widget} key={widget.id.name}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<a
						href={widget.url}
						target="_blank"
						title={`${widget.id.organization}/${widget.id.name}`}
						rel="noreferrer"
					>
						{widget.id.organization}/{widget.id.name}
					</a>
				</h2>
				{widget.private ? <Lock/> : <Unlock/>}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p>Last update {isoToReadableDate(widget.updatedAt)}</p>
					{widget.hasWorkflows && (
						<div>
							{widget.isLastWorkflowSuccess ? <Check/> : <Error/>}
						</div>
					)}
				</div>
				<p className={styles.widget__description}>{widget.description}</p>
				<footer className={styles.widget__footer}>
					<div className={styles.widget__stat}>
						<Star/>
						<span>{widget.stars}</span>
					</div>
					<div className={styles.widget__stat}>
						<Watchers/>
						<span>{widget.watchers}</span>
					</div>
					<div className={styles.widget__stat}>
						<Forks/>
						<span>{widget.forks}</span>
					</div>
					<div className={styles.widget__stat}>
						<IssueOpened/>
						<span>{widget.issues}</span>
					</div>
					<div className={styles.widget__stat}>
						<PullRequests/>
						<span>{widget.pullRequests}</span>
					</div>
				</footer>
			</div>
		</article>
	);
}
