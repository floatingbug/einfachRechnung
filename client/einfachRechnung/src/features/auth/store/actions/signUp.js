import authServices from "../../services";


export async function signUp({credentials}){
	const result = await authServices.signUp({credentials});

	return result;
}
