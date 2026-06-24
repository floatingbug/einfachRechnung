import authService from "../../services";


export async function refresh(){
	const accessToken = await authService.refreshToken({
		token: this.refreshToken,
	});

	this.accessToken = accessToken;
	this.isAuthenticated = true;
}
