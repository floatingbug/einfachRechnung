import appConfig from "@/shared/config/app.config.js";
import demoSeed from "./demo.seed.js";

export default function initDemoState(){
	// --- check mode ---
	if(appConfig.mode !== "demo"){
		return;
	}

	// --- handle demo mode ---
	const key = appConfig.demo.storageKey;

	const existing = localStorage.getItem(key);

	if(existing){
		return;
	}

	if(appConfig.demo.autoSeed){
		localStorage.setItem(key, JSON.stringify(demoSeed));
	}
}
