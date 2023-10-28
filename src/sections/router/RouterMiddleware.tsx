import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGitHubAccessTokenRepository";
import { GitHubAccessTokenSearcher } from "../config/GitHubAccessTokenSearcher";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);

export function RouterMiddleware({ children }: { children: React.ReactElement }) {
	const navigate = useNavigate();

	const ghAccessToken = ghAccessTokenSearcher.search();

	useEffect(() => {
		if (!ghAccessToken) {
			navigate("/config");
		}
	}, [ghAccessToken, navigate]);

	return <>{children}</>;
}
