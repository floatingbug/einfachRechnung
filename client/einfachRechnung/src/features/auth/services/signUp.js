import {authApi} from "../api";


export async function signUp({credentials}){
	const result = authApi.signUp({credentials});

	return result;
}
