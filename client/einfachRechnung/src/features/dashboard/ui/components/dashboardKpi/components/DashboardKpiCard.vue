<script setup>
import {Card} from "primevue";


defineProps({
	item: {
		type: Object,
		required: true,
	},
});

</script>


<template>
	<Card class="kpi-card">
		<template #title>
			<div class="header" :class="item.header.color">
				{{item.header.label}}
			</div>
		</template>

		<template #content>

			<div class="main-content" :class="item.header.color">
				{{item.mainContent.label}}
			</div>
		</template>

		<template #footer>
			<div class="footer" :class="item.footer.color">
				{{item.footer.label}}
			</div>
		</template>
	</Card>
</template>


<style lang="scss" scoped>
.kpi-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: var(--space-xl);
	background-color: var(--color-surface-2);
}

.main-content {
	font-size: 2rem;

	@media(width >= 1800px){
		font-size: 3rem;
	}
}

.mono {
	color: var(--font-color-muted);
}

.danger {
	color: var(--font-color-danger);
}

.primary{
	color: var(--font-color-primary);
}
</style>
