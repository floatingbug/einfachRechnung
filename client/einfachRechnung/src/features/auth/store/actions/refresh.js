import authService from "../../services";


export async function refresh(){
	const accessToken = await authService.refreshToken({
	});

	this.accessToken = accessToken;
	this.isAuthenticated = true;
}
