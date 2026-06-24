import {authApi} from "../api";


export async function resendVerificationEmail({email}){
	const result = await authApi.resendVerificationEmail({email});

	return result;
}
