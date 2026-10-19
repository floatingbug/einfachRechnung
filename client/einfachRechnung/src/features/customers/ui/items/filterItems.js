import {ref} from "vue";


export const filterItems = ref([
	{
		type: "text",
		label: "Name",
		field: "name",
		value: "",
	},
	{
		type: "text",
		label: "Ort",
		field: "city",
		value: "",
	},
	{
		type: "text",
		label: "Telefon",
		field: "phone",
		value: "",
	},
	{
		type: "text",
		label: "E-Mail",
		field: "email",
		value: "",
	},
]);
