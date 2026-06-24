import {http} from "../../../shared/api";


async function signUp({credentials}){
	const {data} = await http.post("/auth/sign-up", credentials);

	return data;
}

async function signIn({credentials}){
	const {data} = await http.post("/auth/sign-in", credentials);

	return data;
}

async function signOut(){
	await http.post("/auth/sign-out");
}

async function verifyEmail({token}){
	const {data} = await http.get(`/auth/verify-email?token=${token}`);

	return data;
}

async function resendVerificationEmail({email}){
	const {data} = await http.post("/auth/verify-email/resend", {
		email,
	});

	return data;
}

async function refreshToken({token}){
	const {data} = await http.post("/auth/refresh");

	return data.accessToken;
}


export const authApi = {
	signUp,
	signIn,
	signOut,
	refreshToken,
	verifyEmail,
	resendVerificationEmail,
};
