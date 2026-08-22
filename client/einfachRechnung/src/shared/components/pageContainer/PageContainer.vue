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
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--space-xl);
	margin-bottom: 12rem;
}

h1 {
	margin-bottom: var(--space-xl2);
}
</style>
