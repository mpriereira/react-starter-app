import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGitHubAccessTokenRepository";
import { Config } from "./Config";

const repository = new LocalStorageGitHubAccessTokenRepository();

export function ConfigFactory() {
	return <Config repository={repository} />;
}
