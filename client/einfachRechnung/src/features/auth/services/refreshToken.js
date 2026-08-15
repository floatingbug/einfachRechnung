import {authApi} from "../api";


export async function refreshToken(){
	const accessToken = await authApi.refreshToken();

	return accessToken;
}
