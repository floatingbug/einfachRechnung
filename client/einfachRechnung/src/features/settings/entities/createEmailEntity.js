const DEFAULT_EMAIL = {
	smtpHost: "",
	smtpPort: 587,

	username: "",
	password: "",

	fromEmail: "",
	fromName: "",

	secure: false,

	autoSendInvoices: false,

	replyToEmail: "",
};


export function createEmailEntity({email} = {}){
	return {
		...DEFAULT_EMAIL,
		...email,
	};
}
