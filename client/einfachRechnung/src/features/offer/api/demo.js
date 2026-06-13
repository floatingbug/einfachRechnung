const STORAGE_KEY = "demo_state";

/**
 * --- helpers ---
 */

function loadState(){
	const raw = localStorage.getItem(STORAGE_KEY);

	if(!raw){
		return null;
	}

	try{
		return JSON.parse(raw);
	}
	catch(error){
		return null;
	}
}

// --- api calls ---
async function addItem(){

}

export default {
	addItem,
};
