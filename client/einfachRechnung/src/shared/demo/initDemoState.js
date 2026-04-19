import appConfig from "@/shared/config/app.config.js";
import demoSeed from "./demo.seed.js";

export default function initDemoState(){
	if(appConfig.mode !== "demo"){
		return;
	}


	const key = appConfig.demo.storageKey;

	const existing = localStorage.getItem(key);

	if(existing){
		return;
	}

	if(appConfig.demo.autoSeed){
		localStorage.setItem(key, JSON.stringify(demoSeed));
	}
}
