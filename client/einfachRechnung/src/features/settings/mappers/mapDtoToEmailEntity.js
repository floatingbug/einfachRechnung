import {createEmailEntity} from "../entities";


export function mapDtoToEmailEntity({dto} = {}){
	let email = {};

	if(dto){
		email = {
			smtpHost: dto.smtpHost ?? "",
			smtpPort: dto.smtpPort ?? 587,

			username: dto.username ?? "",
			password: dto.password ?? "",

			fromEmail: dto.fromEmail ?? "",
			fromName: dto.fromName ?? "",

			secure: dto.secure ?? false,

			autoSendInvoices: dto.autoSendInvoices ?? false,

			replyToEmail: dto.replyToEmail ?? "",
		};
	}

	return createEmailEntity({email});
}
