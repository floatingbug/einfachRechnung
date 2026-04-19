import {AuthLayout} from "@/app/layouts";
import SignUpView from "../views/SignUpView.vue";


export default [
	{
		path: "/auth",
		component: AuthLayout,
		children: [
			{
				path: "sign-up",
				component: SignUpView,
			},
		],
	},
];
