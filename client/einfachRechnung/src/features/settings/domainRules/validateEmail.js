const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HOST_REGEX =
	/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// --------------------
// main validator
// --------------------
export function validateEmail({emailSettings} = {}){
	const normalizedEmailSettings =
		normalizeEmailSettings(emailSettings);

	const errors = {};

	// --- smtpHost ---
	if(!normalizedEmailSettings.smtpHost){
		errors.smtpHost = "SMTP Host ist erforderlich";
	}
	else if(!HOST_REGEX.test(normalizedEmailSettings.smtpHost)){
		errors.smtpHost = "Ungültiger SMTP Host";
	}
	else if(normalizedEmailSettings.smtpHost.length > 255){
		errors.smtpHost =
			"SMTP Host darf maximal 255 Zeichen lang sein";
	}

	// --- smtpPort ---
	if(
		normalizedEmailSettings.smtpPort === null ||
		normalizedEmailSettings.smtpPort === undefined
	){
		errors.smtpPort = "SMTP Port ist erforderlich";
	}
	else if(
		typeof normalizedEmailSettings.smtpPort !== "number"
	){
		errors.smtpPort = "SMTP Port muss eine Zahl sein";
	}
	else if(
		normalizedEmailSettings.smtpPort < 1 ||
		normalizedEmailSettings.smtpPort > 65535
	){
		errors.smtpPort =
			"SMTP Port muss zwischen 1 und 65535 liegen";
	}

	// --- username ---
	if(!normalizedEmailSettings.username){
		errors.username = "Benutzername ist erforderlich";
	}
	else if(normalizedEmailSettings.username.length > 255){
		errors.username =
			"Benutzername darf maximal 255 Zeichen lang sein";
	}

	// --- password ---
	if(!normalizedEmailSettings.password){
		errors.password = "Passwort ist erforderlich";
	}
	else if(normalizedEmailSettings.password.length > 255){
		errors.password =
			"Passwort darf maximal 255 Zeichen lang sein";
	}

	// --- fromEmail ---
	if(!normalizedEmailSettings.fromEmail){
		errors.fromEmail = "Absender E-Mail ist erforderlich";
	}
	else if(
		!EMAIL_REGEX.test(normalizedEmailSettings.fromEmail)
	){
		errors.fromEmail = "Ungültiges E-Mail-Format";
	}

	// --- fromName ---
	if(!normalizedEmailSettings.fromName){
		errors.fromName = "Absender Name ist erforderlich";
	}
	else if(normalizedEmailSettings.fromName.length > 120){
		errors.fromName =
			"Absender Name darf maximal 120 Zeichen lang sein";
	}

	// --- replyToEmail ---
	if(normalizedEmailSettings.replyToEmail){
		if(
			!EMAIL_REGEX.test(
				normalizedEmailSettings.replyToEmail
			)
		){
			errors.replyToEmail =
				"Ungültiges Reply-To E-Mail-Format";
		}
	}

	// --- secure ---
	if(typeof normalizedEmailSettings.secure !== "boolean"){
		errors.secure = "SSL Einstellung muss Boolean sein";
	}

	// --- autoSendInvoices ---
	if(
		typeof normalizedEmailSettings.autoSendInvoices !==
		"boolean"
	){
		errors.autoSendInvoices =
			"Automatischer Rechnungsversand muss Boolean sein";
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
		data: normalizedEmailSettings,
	};
}

// --------------------
// normalization
// --------------------
function normalizeEmailSettings(emailSettings = {}){
	const normalized = {};

	for(const [key, value] of Object.entries(emailSettings)){
		if(typeof value === "string"){
			normalized[key] = value.trim();
		}
		else{
			normalized[key] = value;
		}
	}

	normalized.smtpHost = normalized.smtpHost || "";

	normalized.smtpPort =
		typeof normalized.smtpPort === "number"
			? normalized.smtpPort
			: null;

	normalized.username = normalized.username || "";

	normalized.password = normalized.password || "";

	normalized.fromEmail =
		(normalized.fromEmail || "").toLowerCase();

	normalized.fromName = normalized.fromName || "";

	normalized.replyToEmail =
		(normalized.replyToEmail || "").toLowerCase();

	normalized.secure = Boolean(normalized.secure);

	normalized.autoSendInvoices =
		Boolean(normalized.autoSendInvoices);

	return normalized;
}
