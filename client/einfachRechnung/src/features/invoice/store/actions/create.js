import services from "../../services";


export default async function create(form){
	const result = await services.create(form);

	return result;
}
