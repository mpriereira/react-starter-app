export class RepositoryNotFoundError extends Error {
	constructor(id: string) {
		super(`The repository with id ${id} does not exist`);
	}
}
