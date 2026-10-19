import {http} from "@/shared/api";


export async function getDashboard(){
	const {data} = await http.get("/dashboard");

	return data;
}
