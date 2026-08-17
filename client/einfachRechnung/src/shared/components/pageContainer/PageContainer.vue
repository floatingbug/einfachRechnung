<script setup>

</script>


<template>
	<div class="page-container">
		<h1>
			<slot name="header"></slot>
		</h1>

		<slot></slot>
	</div>
</template>


<style lang="scss" scoped>
.page-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--space-xl);
}
</style>
