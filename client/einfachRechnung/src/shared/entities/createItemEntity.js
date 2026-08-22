const DEFAULT_ITEM = {
	id: "",

	type: "service",

	title: "",
	description: "",

	quantity: 1,
	unit: "pcs",

	unitPrice: 0,

	discountType: "none",
	discountValue: 0,

	taxRate: 19,
};


export function createItemEntity(item = {}){
	return {
		...DEFAULT_ITEM,
		...item,

		id: crypto.randomUUID(),
	};
}
