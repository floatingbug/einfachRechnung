import services from "../../services";

export async function getDashboard() {
	if (this.isLoading) return;

	this.isLoading = true;
	this.error = null;

	try {
		const result = await services.getDashboard();

		// result.kpis enthält jetzt auch revenueChangePercent (aus dem Service)
		this.$patch({
			kpis: result.kpis,
			paymentStatus: result.paymentStatus,
			recentInvoices: result.recentInvoices,
			recentOffers: result.recentOffers,
			revenueByMonth: result.revenueByMonth,
			loadedAt: new Date(),
		});
	} catch (err) {
		this.error = err.message ?? "Dashboard konnte nicht geladen werden.";
	} finally {
		this.isLoading = false;
	}
}
