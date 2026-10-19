<script setup>
import {ref} from "vue";


defineProps({
	company: {
		type: Object,
		required: true,
	}
})


const month = ref(
	new Date().toLocaleString("de-DE", {
		month: "long",
		year: "numeric"
	})
);

</script>


<template>
	<div class="dashboard-header">
		<div class="greeting">
			<h1>Guten Tag, {{company.ownerName}}</h1>
			<span class="company-name">{{company.companyName}} · {{month}}</span>
		</div>

		<div class="actions">
			<Button class="action-button"
				as="router-link"
				to="/offer/create"
				severity="secondary"
				outlined
			>
				Neues Angebot
			</Button>

			<Button class="action-button"
				as="router-link"
				to="/invoice/create"
				severity="secondary"
				outlined
			>
				Neue Rechnung
			</Button>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.dashboard-header {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.greeting {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);

	h1 {
		margin: 0;
	}
}

@media(width >= 540px) {
	.greeting {
		min-width: 430px;
	}
}

.company-name {
	color: var(--font-color-muted);
}

.actions {
	align-self: flex-start;
	display: none;

	.action-button {
		min-width: 155px;
		text-decoration: none;
	}
}

@media(width >= 730px){
	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: var(--space-md);
	}

	.dashboard-header {
		flex-direction: row;
		align-items: center;
	}
}
</style>
