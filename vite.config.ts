/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";

export default defineConfig((configEnv) => {
	const isDevelopment = configEnv.mode === "development";

	return {
		plugins: [react(), svgr(), EnvironmentPlugin("all")],
		css: {
			modules: {
				generateScopedName: isDevelopment ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:5]",
			},
		},
		test: {
			setupFiles: "./tests/setupTests.ts",
			include: ["**/tests/sections/**/*.(test).(ts|tsx)"],
			environment: "jsdom",
		},
	};
});
