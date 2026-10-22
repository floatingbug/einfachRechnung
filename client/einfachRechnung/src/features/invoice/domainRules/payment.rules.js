export function isValidPayment(payment = {}, openAmount = 0){
	const amount = Number(payment.amount);
	if(!Number.isFinite(amount) || amount <= 0) return {valid: false, error: "Der Zahlungsbetrag muss größer als null sein."};
	if(amount > openAmount) return {valid: false, error: "Der Zahlungsbetrag übersteigt den offenen Betrag."};
	return {valid: true};
}

export function isValidPaymentDate(payment = {}){
	const value = payment.paidAt;

	if(typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)){
		return {valid: false, error: "Bitte ein gültiges Zahlungsdatum angeben."};
	}

	const date = new Date(`${value}T00:00:00.000Z`);

	if(Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value){
		return {valid: false, error: "Bitte ein gültiges Zahlungsdatum angeben."};
	}

	return {valid: true};
}

export function validatePayment(payment = {}, openAmount = 0){
	const amountResult = isValidPayment(payment, openAmount);

	if(!amountResult.valid){
		return amountResult;
	}

	return isValidPaymentDate(payment);
}
