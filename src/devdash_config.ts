export interface DevDashConfig {
	github_access_token: string;
}

export const config: DevDashConfig = {
	github_access_token: process.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN as string,
};
