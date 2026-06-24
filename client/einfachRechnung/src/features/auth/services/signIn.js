import {authApi} from "../api";


export async function signIn({credentials}){
	const result = await authApi.signIn({credentials});

	return result;
}
