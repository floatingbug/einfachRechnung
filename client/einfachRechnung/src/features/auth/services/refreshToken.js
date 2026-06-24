import {authApi} from "../api";


export async function refreshToken({token}){
	const accessToken = await authApi.refreshToken({token});

	return accessToken;
}
