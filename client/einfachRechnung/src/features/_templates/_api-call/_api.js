import { http } from "@/shared/api";


export async function name() {
	const { data } = await name.api({

	});

	return data;
}
