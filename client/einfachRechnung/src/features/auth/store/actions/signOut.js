import authService from "../../services";


export async function signOut(){
	await authService.signOut();
	this.accessToken = "";
	this.user = {};
	this.isAuthenticated = false;
}
