import authService from "../../services";


export async function signIn({credentials}){
	const result = await authService.signIn({credentials});

	this.accessToken = result.accessToken;
	this.user = result.user;
	this.isAuthenticated = true;

	return result;
}
