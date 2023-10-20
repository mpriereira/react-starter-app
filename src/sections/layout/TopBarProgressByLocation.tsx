import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#fff",
		"1.0": "#3cff64",
	},
	shadowBlur: 5,
});

const TopBarProgressByLocation = () => {
	const [progress, setProgress] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setProgress(true);
	}, [location]);

	useEffect(() => {
		const disableTopBar = () => {
			setProgress(false);
		};

		document.addEventListener("pageLoaded", disableTopBar);

		return () => {
			document.removeEventListener("pageLoaded", disableTopBar);
		};
	}, []);

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};

export default TopBarProgressByLocation;
