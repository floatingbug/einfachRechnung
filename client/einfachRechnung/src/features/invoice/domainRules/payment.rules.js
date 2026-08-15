export function isValidPayment(payment = {}, openAmount = 0){
	const amount = Number(payment.amount);
	if(!Number.isFinite(amount) || amount <= 0) return {valid: false, error: "Der Zahlungsbetrag muss größer als null sein."};
	if(amount > openAmount) return {valid: false, error: "Der Zahlungsbetrag übersteigt den offenen Betrag."};
	return {valid: true};
}
