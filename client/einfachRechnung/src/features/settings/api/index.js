import appConfig from "@/shared/config/app.config.js";

import demo from "./demo.js";
import http from "./settings.api.js";

const api = appConfig.mode === "demo"
	? demo
	: http;

export default api;
