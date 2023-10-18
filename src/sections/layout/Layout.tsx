import styles from "./Layout.module.scss";
import { ReactComponent as Brand } from "/src/assets/svg/brand.svg";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>

			<ErrorBoundary >
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
