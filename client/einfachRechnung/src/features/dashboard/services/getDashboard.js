import dashboardApi from "../api";


export async function getDashboard() {
	const data = await dashboardApi.getDashboard();
	const { revenueNetMonth: current, revenueNetPreviousMonth: previous } = data.kpis;

	return {
		...data,
		kpis: { ...data.kpis, revenueChangePercent: previous ? ((current - previous) / previous) * 100 : null },
	};
}
