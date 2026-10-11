import featureApi from "../api";


export async function name() {
	const result = await featureApi.name({

	});

	return result;
}
