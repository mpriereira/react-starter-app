import React, { useState } from "react";

import { ReactComponent as Add } from "../../assets/svg/add.svg";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./AddWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormData = { id: string; repositoryUrl: string };

type AddWidgetFormParams = {
	repository: RepositoryWidgetRepository;
};

export function AddWidgetForm({ repository }: AddWidgetFormParams) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [formState, setFormState] = useState<FormData>({
		id: "",
		repositoryUrl: "",
	});
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const urlRegex =
		/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;

	const isValidForm: boolean =
		!!formState.id && !!formState.repositoryUrl && urlRegex.test(formState.repositoryUrl);

	const handleFormChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setFormState((prevState) => ({
			...prevState,
			[ev.target.name]: ev.target.value,
		}));
	};

	const submitForm = async (ev: FormEvent<FormData>) => {
		ev.preventDefault();
		const { id, repositoryUrl } = ev.target.elements;
		const error = await save({ id: id.value, repositoryUrl: repositoryUrl.value });
		setHasAlreadyExistsError(!!error);
		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input
								type="text"
								name="id"
								id="id"
								value={formState.id}
								onChange={handleFormChange}
							/>
						</div>
						<div>
							<label htmlFor="repositoryUrl">Url del repositorio</label>
							<input
								type="text"
								name="repositoryUrl"
								id="repositoryUrl"
								value={formState.repositoryUrl}
								onChange={handleFormChange}
							/>
						</div>

						{hasAlreadyExistsError && (
							<p role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}

						<div>
							<input type="submit" value="Añadir" disabled={!isValidForm} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
