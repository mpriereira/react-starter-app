import { faker } from "@faker-js/faker";

import { GitHubRepository } from "../src/domain/GitHubRepository";

export class GitHubRepositoryMother {
	static create(params?: Partial<GitHubRepository>): GitHubRepository {
		const defaultParams: GitHubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.word.sample(),
			},
			description: faker.word.words(10),
			url: faker.internet.url(),
			private: faker.datatype.boolean(),
			forks: faker.number.int(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.number.int(),
			issues: faker.number.int(),
			pullRequests: faker.number.int(),
			updatedAt: faker.date.anytime(),
			watchers: faker.number.int(),
			workflowRunsStatus: [],
			...params,
		};

		return defaultParams;
	}
}
