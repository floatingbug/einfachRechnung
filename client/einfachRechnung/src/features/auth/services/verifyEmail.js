import {authApi} from "../api";


export async function verifyEmail({token}){
	const result = await authApi.verifyEmail({token})
}
