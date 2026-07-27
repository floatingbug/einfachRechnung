<script setup>
import {OfferSettingsForm} from "../components";

</script>


<template>
	<div class="offer-settings">
		<OfferSettingsForm
		/>
	</div>
</template>


<style lang="scss" scoped>
.offer-settings {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-xl);
}
</style>
