import { useEffect, useState } from "react";
import { GitHubRepository } from "../../domain/GitHubRepository";
import { config } from "../../devdash_config";
import { ReactComponent as Brand } from "/src/assets/svg/brand.svg";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const [gitHubApiResponse, setGitHubApiResponse] = useState<GitHubRepository[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((response) => {
				setGitHubApiResponse(response);
			});
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			{gitHubApiResponse.length === 0 ? (
					<div className={styles.empty}>
						<span>No hay widgets configurados.</span>
					</div>
				) : (
					<section className={styles.container}>
					{gitHubApiResponse.map((widget) => (
						<GitHubRepositoryWidget
							key={`${widget.id.organization}/${widget.id.name}`}
							widget={widget}
						/>
					))}
				</section>
			)}
		</>
	);
}
