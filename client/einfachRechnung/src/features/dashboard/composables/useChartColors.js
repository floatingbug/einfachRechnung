import { onBeforeUnmount, onMounted, ref } from "vue";

// Chart.js zeichnet auf ein <canvas> und versteht keine var(--…)-Werte.
// Deshalb werden die PrimeVue-Design-Tokens zur Laufzeit aufgelöst.
const readColors = () => {
	const style = getComputedStyle(document.documentElement);
	const get = (name) => style.getPropertyValue(name).trim();

	return {
		text: get("--p-text-color"),
		muted: get("--p-text-muted-color"),
		border: get("--p-content-border-color"),
		invoiced: get("--p-primary-color"),
		paid: get("--p-orange-400"),
	};
};

export function useChartColors() {
	const colors = ref(readColors());
	let observer;

	onMounted(() => {
		colors.value = readColors();

		// Dark-Mode-Wechsel (Klasse auf <html>) -> Farben neu einlesen
		observer = new MutationObserver(() => {
			colors.value = readColors();
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
	});

	onBeforeUnmount(() => observer?.disconnect());

	return colors;
}
