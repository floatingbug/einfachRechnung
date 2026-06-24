import {AuthLayout} from "@/app/layouts";
import SignUpView from "../ui/views/SignUpView.vue";
import SignInView from "../ui/views/SignInView.vue";
import VerifyEmailCallbackView from "../ui/views/VerifyEmailCallbackView.vue";
import VerifyEmail from "../ui/views/VerifyEmailView.vue";


export default [
	{
		path: "/auth",
		component: AuthLayout,
		children: [
			{
				path: "sign-up",
				component: SignUpView,
			},
			{
				path: "sign-in",
				component: SignInView,
			},
		],
	},
	{
		path: "/auth/verify-email/callback",
		component: VerifyEmailCallbackView,
	},
	{
		path: "/auth/verify-email",
		component: VerifyEmail,
	},
];
