import {authApi} from "../api";


export async function signOut(){
	await authApi.signOut();
}
