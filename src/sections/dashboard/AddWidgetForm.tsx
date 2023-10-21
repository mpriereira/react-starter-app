import React, { useState } from "react";

import { ReactComponent as Add } from "../../assets/svg/add.svg";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./AddWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormEvent<T extends { [key: string]: string }> = React.FormEvent<HTMLFormElement> & {
	target: { [key in keyof T]: { value: T[key] } };
};

type FormData = { id: string; url: string };

type AddWidgetFormParams = {
	repository: RepositoryWidgetRepository;
};

export function AddWidgetForm({ repository }: AddWidgetFormParams) {
	const [isFormActive, setIsFormActive] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormData>) => {
		ev.preventDefault();
		const { id, url } = ev.target;
		await save({ id: id.value, repositoryUrl: url.value });

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" id="id" />
						</div>
						<div>
							<label htmlFor="url">Url del repositorio</label>
							<input type="text" id="url" />
						</div>

						<div>
							<input type="submit" value="Añadir" />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
