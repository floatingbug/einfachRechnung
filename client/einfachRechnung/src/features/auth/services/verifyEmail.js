import {authApi} from "../api";


export async function verifyEmail({token}){
	return authApi.verifyEmail({token});
}
